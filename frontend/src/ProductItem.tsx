import React from 'react';
import { ProductType } from './Product';

interface ProductItemProps {
  product: ProductType;
}

export function generateIdFromSku(sku: string): string {
  let hash = 0;
  for (let i = 0; i < sku.length; i++) {
    const char = sku.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <div>
    <h3>{product.title}</h3>
    <p>SKU: {product.sku}</p>
    <p>Price: ${product.price.toFixed(2)}</p>
    <p>{product.description}</p>
    <p>UserID: {generateIdFromSku(product.sku)}</p>
  </div>
);

export default ProductItem;
