import { SelectorField, type SelectorOption } from "@/components/QuoteCalculator/SelectorField";

export function FabricSelector({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
}) {
  return <SelectorField label="Fabric" value={value} onChange={onChange} options={options} />;
}
