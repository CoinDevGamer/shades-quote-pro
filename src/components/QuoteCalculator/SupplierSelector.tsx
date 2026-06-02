import { SelectorField, type SelectorOption } from "@/components/QuoteCalculator/SelectorField";

export function SupplierSelector({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
}) {
  return <SelectorField label="Supplier" value={value} onChange={onChange} options={options} />;
}
