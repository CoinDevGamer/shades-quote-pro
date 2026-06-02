export type SlatsOnlyVariantId =
  | "standard"
  | "beige-weights-chains-white-hangers"
  | "chainless"
  | "metal-welded-or-sewn-weights";

export interface SlatsOnlyVariant {
  id: SlatsOnlyVariantId;
  name: string;
  lengthsMm: number[];
  bands: Record<string, number[]>;
}

export interface SlatsOnlyPriceTable {
  id: string;
  year: number;
  currency: "GBP";
  slatWidthMm: number;
  source?: string;
  notes?: string;
  lengthsLabel?: string;
  bandsLabel?: string;
  priceLabel?: string;
  variants: SlatsOnlyVariant[];
}
