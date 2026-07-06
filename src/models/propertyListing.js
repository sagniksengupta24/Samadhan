export const LISTING_TYPES = {
  RENT: "rent",
  SELL: "sell"
};

export const emptyListingForm = {
  name: "",
  address: "",
  price: "",
  listingType: LISTING_TYPES.RENT,
  bedrooms: "",
  rooms: "",
  bathrooms: "",
  description: "",
  images: [],
  contactName: "",
  contactPhone: "",
  contactEmail: ""
};

export function formFromListing(listing) {
  if (!listing) {
    return { ...emptyListingForm, images: [] };
  }

  return {
    name: listing.name ?? "",
    address: listing.address ?? "",
    price: listing.price == null ? "" : String(listing.price),
    listingType: listing.listingType ?? LISTING_TYPES.RENT,
    bedrooms: listing.bedrooms == null ? "" : String(listing.bedrooms),
    rooms: listing.rooms == null ? "" : String(listing.rooms),
    bathrooms: listing.bathrooms == null ? "" : String(listing.bathrooms),
    description: listing.description ?? "",
    images: Array.isArray(listing.images) ? listing.images : [],
    contactName: listing.contactName ?? "",
    contactPhone: listing.contactPhone ?? "",
    contactEmail: listing.contactEmail ?? ""
  };
}

export function formatListingType(type) {
  return type === LISTING_TYPES.SELL ? "Sell" : "Rent";
}

export function formatPrice(price) {
  const value = Number(price);
  if (!Number.isFinite(value)) {
    return "INR 0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value);
}

export function formatShortDate(value) {
  if (!value) {
    return "Not saved";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(value));
  } catch {
    return "Not saved";
  }
}
