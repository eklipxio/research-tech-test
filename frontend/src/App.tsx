import './App.css';
import { ProductType } from './Product';
import ProductList from './ProductList';
import productsData from '../products.json';

function App() {
  const products: ProductType[] = productsData.products as ProductType[];

  return (
    <>
      <h1>Product List</h1>
      <ProductList products={products} />
    </>
  );
}

export default App;
