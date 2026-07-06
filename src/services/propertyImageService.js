import { getSupabaseClient } from "../lib/supabase";

export const PROPERTY_IMAGE_BUCKET = "property-images";

function isRemoteImage(uri) {
  return /^https?:\/\//i.test(String(uri || ""));
}

function getStoragePathFromPublicUrl(uri) {
  const marker = `/storage/v1/object/public/${PROPERTY_IMAGE_BUCKET}/`;
  const value = String(uri || "");
  const markerIndex = value.indexOf(marker);

  if (markerIndex === -1) {
    return "";
  }

  const pathWithQuery = value.slice(markerIndex + marker.length);
  return decodeURIComponent(pathWithQuery.split("?")[0]);
}

function getFileExtension(uri) {
  const cleanUri = String(uri || "").split("?")[0];
  const match = cleanUri.match(/\.([a-zA-Z0-9]+)$/);
  return match?.[1]?.toLowerCase() || "jpg";
}

function getContentType(extension) {
  if (extension === "png") {
    return "image/png";
  }

  if (extension === "webp") {
    return "image/webp";
  }

  return "image/jpeg";
}

async function imageUriToArrayBuffer(uri) {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error("Unable to read the selected image.");
  }

  return response.arrayBuffer();
}

async function uploadPropertyImage({ userId, propertyId, uri, index }) {
  const supabase = getSupabaseClient();
  const extension = getFileExtension(uri);
  const path = `${userId}/${propertyId}/${Date.now()}-${index}.${extension}`;
  const body = await imageUriToArrayBuffer(uri);
  const { error } = await supabase.storage.from(PROPERTY_IMAGE_BUCKET).upload(path, body, {
    contentType: getContentType(extension),
    upsert: true
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(PROPERTY_IMAGE_BUCKET).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function uploadPropertyImages({ userId, propertyId, images = [] }) {
  const uploadedImages = [];
  const uploadedPaths = [];

  try {
    for (const [index, uri] of images.filter(Boolean).entries()) {
      if (isRemoteImage(uri)) {
        uploadedImages.push(uri);
        continue;
      }

      const uploadedImage = await uploadPropertyImage({ userId, propertyId, uri, index });
      uploadedPaths.push(uploadedImage.path);
      uploadedImages.push(uploadedImage.publicUrl);
    }
  } catch (error) {
    if (uploadedPaths.length) {
      await deleteStoragePaths(uploadedPaths).catch(() => {});
    }
    throw error;
  }

  return uploadedImages;
}

async function deleteStoragePaths(paths) {
  const cleanPaths = [...new Set((paths || []).filter(Boolean))];

  if (!cleanPaths.length) {
    return;
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(PROPERTY_IMAGE_BUCKET).remove(cleanPaths);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deletePropertyImages(images = []) {
  const paths = images.map(getStoragePathFromPublicUrl).filter(Boolean);
  await deleteStoragePaths(paths);
}
