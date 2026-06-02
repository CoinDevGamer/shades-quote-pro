export interface ProductType {
  id: string;
  name: string;
  priceTableId: string;
}

export interface Supplier {
  id: string;
  name: string;
  productTypes: ProductType[];
}
