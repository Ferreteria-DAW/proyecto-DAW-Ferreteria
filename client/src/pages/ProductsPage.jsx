import { useEffect } from "react";
import { useProduct } from "../context/ProductsContext";
import { ProductCard } from "../components/ui/ProductCard";

const ProductsPage = () => {
  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  products.length === 0 && <div>No hay productos</div>;

  return(
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
};

export default ProductsPage;
