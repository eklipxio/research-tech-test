import React from 'react';
import ProductItem from './ProductItem';
import { ProductType } from './Product';
import PurchaseButton from './PurchaseButton';

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div>
    {products.map((product) => (
      <div key={product.id}>
        <ProductItem product={product} />
        <PurchaseButton product={product} />
      </div>
    ))}
  </div>
);

export default ProductList;
