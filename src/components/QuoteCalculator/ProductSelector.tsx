import { SelectorField, type SelectorOption } from "@/components/QuoteCalculator/SelectorField";

export function ProductSelector({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
}) {
  return <SelectorField label="Blind type" value={value} onChange={onChange} options={options} />;
}
