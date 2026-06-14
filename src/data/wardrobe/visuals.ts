import type { WardrobeCategoryId } from "@/types/Wardrobe";
import photoSlots from "./photo-slots.json";

type WardrobeVisualSlot = {
  id: string;
  name: string;
  fileName: string;
};

type WardrobeCategoryVisualSlot = WardrobeVisualSlot & {
  id: WardrobeCategoryId;
};

const WARDROBE_PHOTO_ROOT = "/wardrobe-photos";

export const WARDROBE_CATEGORY_PHOTOS = photoSlots.categories as WardrobeCategoryVisualSlot[];
export const WARDROBE_PRODUCT_PHOTOS = photoSlots.products as WardrobeVisualSlot[];
export const WARDROBE_SHARED_PHOTOS = photoSlots.shared as WardrobeVisualSlot[];

function photoUrl(fileName: string): string | undefined {
  const cleaned = fileName.trim().replace(/^\/+/, "");
  return cleaned ? `${WARDROBE_PHOTO_ROOT}/${cleaned}` : undefined;
}

export function wardrobeCategoryImage(id: WardrobeCategoryId): string | undefined {
  return photoUrl(WARDROBE_CATEGORY_PHOTOS.find((slot) => slot.id === id)?.fileName ?? "");
}

export function wardrobeProductImage(id: string): string | undefined {
  return photoUrl(WARDROBE_PRODUCT_PHOTOS.find((slot) => slot.id === id)?.fileName ?? "");
}

export function wardrobeSharedImage(id: string): string | undefined {
  return photoUrl(WARDROBE_SHARED_PHOTOS.find((slot) => slot.id === id)?.fileName ?? "");
}
