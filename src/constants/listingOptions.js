import { LISTING_TYPES } from "../models/propertyListing";

export const typeFilterOptions = [
  { value: "all", label: "All" },
  { value: LISTING_TYPES.RENT, label: "Rent" },
  { value: LISTING_TYPES.SELL, label: "Sell" }
];

export const formTypeOptions = [
  { value: LISTING_TYPES.RENT, label: "Rent" },
  { value: LISTING_TYPES.SELL, label: "Sell" }
];

export const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "priceAsc", label: "Price Low" },
  { value: "priceDesc", label: "Price High" }
];
