import {
  mapListingFormToPropertyInsert,
  mapListingFormToPropertyUpdate,
  mapPropertyRowToListing
} from "../mappers/propertyListingMapper";
import { getSupabaseClient } from "../lib/supabase";
import { deletePropertyImages, uploadPropertyImages } from "./propertyImageService";

const PROPERTY_SELECT = [
  "id",
  "owner_id",
  "name",
  "address",
  "price",
  "listing_type",
  "bedrooms",
  "rooms",
  "bathrooms",
  "description",
  "images",
  "contact_name",
  "contact_phone",
  "contact_email",
  "created_at",
  "updated_at"
].join(", ");

function throwSupabaseError(error, fallbackMessage) {
  if (error) {
    throw new Error(error.message || fallbackMessage);
  }
}

async function getCurrentUser() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  throwSupabaseError(error, "Unable to read the current session.");
  return data.session?.user ?? null;
}

async function requireCurrentUser(action) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error(`Please sign in to ${action}.`);
  }

  return user;
}

async function getSavedIds(userId) {
  if (!userId) {
    return new Set();
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", userId);

  throwSupabaseError(error, "Unable to load saved properties.");
  return new Set((data || []).map((row) => row.property_id));
}

async function isPropertySaved(userId, propertyId) {
  if (!userId) {
    return false;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", userId)
    .eq("property_id", propertyId)
    .maybeSingle();

  throwSupabaseError(error, "Unable to check saved property.");
  return Boolean(data);
}

async function getPropertyListingById(id, userId) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("properties")
    .select(PROPERTY_SELECT)
    .eq("id", id)
    .maybeSingle();

  throwSupabaseError(error, "Unable to load this listing.");

  if (!data) {
    throw new Error("Listing not found.");
  }

  return mapPropertyRowToListing(data, {
    saved: await isPropertySaved(userId, id)
  });
}

async function assertOwnsProperty(id, userId) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id, images")
    .eq("id", id)
    .eq("owner_id", userId)
    .maybeSingle();

  throwSupabaseError(error, "Unable to confirm listing ownership.");

  if (!data) {
    throw new Error("Listing not found or you do not own it.");
  }

  return data;
}

export async function listPropertyListings() {
  const supabase = getSupabaseClient();
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from("properties")
    .select(PROPERTY_SELECT)
    .order("created_at", { ascending: false });

  throwSupabaseError(error, "Unable to load property listings.");

  const savedIds = await getSavedIds(user?.id);
  return (data || []).map((row) =>
    mapPropertyRowToListing(row, { saved: savedIds.has(row.id) })
  );
}

export async function createPropertyListing(input) {
  const supabase = getSupabaseClient();
  const user = await requireCurrentUser("create a listing");
  const insertPayload = mapListingFormToPropertyInsert({ ...input, images: [] }, user.id);
  const { data: createdRow, error: createError } = await supabase
    .from("properties")
    .insert(insertPayload)
    .select(PROPERTY_SELECT)
    .single();

  throwSupabaseError(createError, "Unable to create this listing.");

  let finalRow = createdRow;
  if (input.images?.length) {
    let uploadedImages = [];
    try {
      uploadedImages = await uploadPropertyImages({
        userId: user.id,
        propertyId: createdRow.id,
        images: input.images
      });

      const { data: updatedRow, error: imageUpdateError } = await supabase
        .from("properties")
        .update({ images: uploadedImages, updated_at: new Date().toISOString() })
        .eq("id", createdRow.id)
        .eq("owner_id", user.id)
        .select(PROPERTY_SELECT)
        .single();

      throwSupabaseError(imageUpdateError, "Listing was created, but the images could not be saved.");
      finalRow = updatedRow;
    } catch (error) {
      await deletePropertyImages(uploadedImages).catch(() => {});
      await supabase
        .from("properties")
        .delete()
        .eq("id", createdRow.id)
        .eq("owner_id", user.id);
      throw new Error(error.message || "Unable to upload listing images. The listing was not saved.");
    }
  }

  return mapPropertyRowToListing(finalRow, { saved: false });
}

export async function updatePropertyListing(id, input) {
  const supabase = getSupabaseClient();
  const user = await requireCurrentUser("update this listing");
  const existingRow = await assertOwnsProperty(id, user.id);
  const existingRemoteImages = new Set((input.images || []).filter((uri) => /^https?:\/\//i.test(String(uri || ""))));

  const uploadedImages = await uploadPropertyImages({
    userId: user.id,
    propertyId: id,
    images: input.images || []
  });
  const updatePayload = mapListingFormToPropertyUpdate({ ...input, images: uploadedImages });
  const { data, error } = await supabase
    .from("properties")
    .update(updatePayload)
    .eq("id", id)
    .eq("owner_id", user.id)
    .select(PROPERTY_SELECT)
    .maybeSingle();

  if (error) {
    const newUploads = uploadedImages.filter((uri) => !existingRemoteImages.has(uri));
    await deletePropertyImages(newUploads).catch(() => {});
    throwSupabaseError(error, "Unable to update this listing.");
  }

  if (!data) {
    const newUploads = uploadedImages.filter((uri) => !existingRemoteImages.has(uri));
    await deletePropertyImages(newUploads).catch(() => {});
    throw new Error("Listing not found or you do not own it.");
  }

  const retainedImages = new Set(uploadedImages);
  const removedImages = (existingRow.images || []).filter((uri) => !retainedImages.has(uri));
  await deletePropertyImages(removedImages).catch(() => {});

  return mapPropertyRowToListing(data, {
    saved: await isPropertySaved(user.id, id)
  });
}

export async function deletePropertyListing(id) {
  const supabase = getSupabaseClient();
  const user = await requireCurrentUser("delete this listing");
  const existingRow = await assertOwnsProperty(id, user.id);
  const { data, error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id)
    .select("id")
    .maybeSingle();

  throwSupabaseError(error, "Unable to delete this listing.");

  if (!data) {
    throw new Error("Listing not found or you do not own it.");
  }

  await deletePropertyImages(existingRow.images).catch(() => {});

  return listPropertyListings();
}

export async function toggleSavedPropertyListing(id) {
  const supabase = getSupabaseClient();
  const user = await requireCurrentUser("save listings");
  const { data: existingSaved, error: existingError } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", user.id)
    .eq("property_id", id)
    .maybeSingle();

  throwSupabaseError(existingError, "Unable to check saved property.");

  if (existingSaved) {
    const { error } = await supabase
      .from("saved_properties")
      .delete()
      .eq("user_id", user.id)
      .eq("property_id", id);
    throwSupabaseError(error, "Unable to remove this saved property.");
  } else {
    const { error } = await supabase.from("saved_properties").insert({
      user_id: user.id,
      property_id: id
    });
    throwSupabaseError(error, "Unable to save this property.");
  }

  return getPropertyListingById(id, user.id);
}
