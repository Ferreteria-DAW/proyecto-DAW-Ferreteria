import { useProduct } from "../../context/ProductsContext";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { deleteProduct } = useProduct();

  return (
    <section className="bg-zinc-800 p-4 my-2 rounded-md">
      <header className="flex justify-between">
        <h2>{product.productName}</h2>
      </header>
      <img src={`http://localhost:3000/${product.productImage}`} alt={product.productName} />
      <p className=" text-slate-300">{product.productDescription}</p>
      <p className=" text-slate-300">{product.productPrice}</p>
      <div className="flex gap-x-2 items-center">
        <button
          onClick={() => {
            deleteProduct(product._id);
          }}
        >
          Eliminar
        </button>
        <Link to={`/product/${product._id}`}>Editar</Link>
      </div>
    </section>
  );
};
