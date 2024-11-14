import React from 'react';
import { ProductType } from './Product';
import { generateIdFromSku } from './ProductItem';

interface PurchaseButtonProps {
  product: ProductType;
}

async function purchase(sku: string) {
  try {
    const response = await fetch('http://localhost:3000/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sku, userId: generateIdFromSku(sku) }), // Send SKU in the request body
      //   body: JSON.stringify(sku), // Send SKU in the request body
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data); // Log the response or update state as needed
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ product }) => (
  <div>
    <button onClick={() => purchase(product.sku)}>Purchase</button>
  </div>
);

export default PurchaseButton;
