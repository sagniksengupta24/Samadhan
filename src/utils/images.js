import { images } from "../constants/fallbackImages";

export function getPrimaryImage(property) {
  return property.images?.[0] || images.detail;
}
