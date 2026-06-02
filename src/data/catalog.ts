import suppliersJson from "@/data/suppliers/suppliers.json";
import fabricsJson from "@/data/fabrics/fabrics.json";
import priceTablesJson from "@/data/priceTables/priceTables.json";
import slatsOnlyPriceTablesJson from "@/data/priceTables/slatsOnly89mm.json";
import extrasJson from "@/data/extras/extras.json";
import type { Extra } from "@/types/Extra";
import type { Fabric } from "@/types/Fabric";
import type { PriceTable } from "@/types/PriceTable";
import type { SlatsOnlyPriceTable } from "@/types/SlatsOnlyPriceTable";
import type { Supplier } from "@/types/Supplier";

export const suppliers = suppliersJson as Supplier[];
export const fabrics = fabricsJson as Fabric[];
export const priceTables = priceTablesJson as PriceTable[];
export const slatsOnlyPriceTables = slatsOnlyPriceTablesJson as SlatsOnlyPriceTable[];
export const extras = extrasJson as Extra[];
