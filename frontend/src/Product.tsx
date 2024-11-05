export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  tags: [string];
  brand: string;
  sku: string;
  thumbnail: string;
}
