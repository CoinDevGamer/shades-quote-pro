export function roundWidth(widthMm: number, availableWidths: number[]): number {
  return roundUpToAvailableDimension(widthMm, availableWidths, "width");
}

function roundUpToAvailableDimension(value: number, available: number[], label: string): number {
  const sorted = [...available].sort((a, b) => a - b);
  const match = sorted.find((candidate) => value <= candidate);
  if (match == null) {
    throw new Error(`No ${label} price is available for ${value}mm.`);
  }
  return match;
}
