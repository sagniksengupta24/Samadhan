import { LISTING_TYPES } from "../models/propertyListing";

function normalizeImages(images) {
  if (!Array.isArray(images)) {
    return [];
  }

  return images.filter(Boolean).map(String);
}

function normalizeListingType(type) {
  return type === LISTING_TYPES.SELL ? LISTING_TYPES.SELL : LISTING_TYPES.RENT;
}

export function mapPropertyRowToListing(row, options = {}) {
  const saved = Boolean(options.saved);

  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name ?? "",
    address: row.address ?? "",
    price: Number(row.price ?? 0),
    listingType: normalizeListingType(row.listing_type),
    bedrooms: Number(row.bedrooms ?? 0),
    rooms: Number(row.rooms ?? 0),
    bathrooms: Number(row.bathrooms ?? 0),
    description: row.description ?? "",
    images: normalizeImages(row.images),
    contactName: row.contact_name ?? "",
    contactPhone: row.contact_phone ?? "",
    contactEmail: row.contact_email ?? "",
    saved,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function mapListingFormToPropertyInsert(form, userId) {
  return {
    owner_id: userId,
    name: form.name,
    address: form.address,
    price: form.price,
    listing_type: normalizeListingType(form.listingType),
    bedrooms: form.bedrooms,
    rooms: form.rooms,
    bathrooms: form.bathrooms,
    description: form.description,
    images: normalizeImages(form.images),
    contact_name: form.contactName || null,
    contact_phone: form.contactPhone || null,
    contact_email: form.contactEmail || null,
    updated_at: new Date().toISOString()
  };
}

export function mapListingFormToPropertyUpdate(form) {
  return {
    name: form.name,
    address: form.address,
    price: form.price,
    listing_type: normalizeListingType(form.listingType),
    bedrooms: form.bedrooms,
    rooms: form.rooms,
    bathrooms: form.bathrooms,
    description: form.description,
    images: normalizeImages(form.images),
    contact_name: form.contactName || null,
    contact_phone: form.contactPhone || null,
    contact_email: form.contactEmail || null,
    updated_at: new Date().toISOString()
  };
}
