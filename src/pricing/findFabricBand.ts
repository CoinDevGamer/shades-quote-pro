import type { Fabric } from "@/types/Fabric";

export function findFabricBand({
  fabrics,
  supplierId,
  productTypeId,
  fabricId,
}: {
  fabrics: Fabric[];
  supplierId: string;
  productTypeId: string;
  fabricId: string;
}): string {
  const fabric = fabrics.find(
    (item) =>
      item.id === fabricId &&
      item.supplierId === supplierId &&
      item.productTypeId === productTypeId,
  );

  if (!fabric) {
    throw new Error("Selected fabric is not available for this supplier and product type.");
  }

  return fabric.band;
}
