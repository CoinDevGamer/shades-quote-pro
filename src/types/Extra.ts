export type ExtraPricing =
  | { type: "fixed"; amount: number }
  | { type: "perBlind"; amount: number }
  | { type: "perMetreWidth"; amount: number }
  | { type: "percentageBase"; amount: number }
  | { type: "fixedPlusPercentageBase"; amount: number; percentage: number }
  | { type: "widthTable"; widths: number[]; prices: number[] };

export interface Extra {
  id: string;
  name: string;
  description?: string;
  pricing: ExtraPricing;
}
