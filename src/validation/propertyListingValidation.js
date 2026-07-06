import { LISTING_TYPES } from "../models/propertyListing";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s0-9]+$/;

function trim(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePositiveNumber(value) {
  const number = Number(trim(value));
  return Number.isFinite(number) && number > 0 ? number : null;
}

function parseWholeNumber(value) {
  const number = Number(trim(value));
  return Number.isInteger(number) && number >= 0 ? number : null;
}

export function validatePropertyListing(values) {
  const errors = {};
  const name = trim(values.name);
  const address = trim(values.address);
  const description = trim(values.description);
  const price = parsePositiveNumber(values.price);
  const bedrooms = parseWholeNumber(values.bedrooms);
  const rooms = parseWholeNumber(values.rooms);
  const bathrooms = parseWholeNumber(values.bathrooms);
  const contactEmail = trim(values.contactEmail);
  const contactPhone = trim(values.contactPhone);

  if (!name) {
    errors.name = "Property name is required.";
  }

  if (!address) {
    errors.address = "Full address is required.";
  }

  if (price == null) {
    errors.price = "Enter a valid numeric price above 0.";
  }

  if (![LISTING_TYPES.RENT, LISTING_TYPES.SELL].includes(values.listingType)) {
    errors.listingType = "Choose Rent or Sell.";
  }

  if (bedrooms == null) {
    errors.bedrooms = "Bedrooms must be a valid whole number.";
  }

  if (rooms == null || rooms < 1) {
    errors.rooms = "Rooms must be at least 1.";
  }

  if (bathrooms == null || bathrooms < 1) {
    errors.bathrooms = "Bathrooms must be at least 1.";
  }

  if (description.length < 20) {
    errors.description = "Description must be at least 20 characters.";
  }

  if (contactEmail && !emailPattern.test(contactEmail)) {
    errors.contactEmail = "Enter a valid email address.";
  }

  if (contactPhone) {
    const digitCount = contactPhone.replace(/\D/g, "").length;
    if (!phonePattern.test(contactPhone) || digitCount < 7 || digitCount > 15) {
      errors.contactPhone = "Enter a valid phone number.";
    }
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}

export function sanitizePropertyListing(values) {
  return {
    name: trim(values.name),
    address: trim(values.address),
    price: Number(trim(values.price)),
    listingType: values.listingType,
    bedrooms: Number(trim(values.bedrooms)),
    rooms: Number(trim(values.rooms)),
    bathrooms: Number(trim(values.bathrooms)),
    description: trim(values.description),
    images: Array.isArray(values.images) ? values.images.filter(Boolean) : [],
    contactName: trim(values.contactName),
    contactPhone: trim(values.contactPhone),
    contactEmail: trim(values.contactEmail)
  };
}
