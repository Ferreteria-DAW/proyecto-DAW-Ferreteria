import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteProduct from "./DeleteProduct";

import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { user } = useContext(UserContext);
  const token = user?.token;

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/products/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [id]);

  if (isLoading) return <CircularProgress className="loader"/>;

  return (
    <section className="dashboard">
      {products && products.length > 0 ? (
        <div className="container dashboard__container">
          {products.map((product, index) => {
            return (
              <article key={index} className="dashboard__product">
                <div className="dashboard__product-info">
                  <div className="dashboard__product-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${product.thumbnail}`} alt="" />
                  </div>
                  <h5>{product.title}</h5>
                </div>
                <div className="dashboard__product-actions">
                  <Link to={`/products/${product._id}`} className="btn sm">
                    Ver
                  </Link>
                  <Link
                    to={`/products/${product._id}/edit`}
                    className="btn sm primary"
                  >
                    Editar
                  </Link>
                  <DeleteProduct productId={product._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No hay productos</h2>
      )}
    </section>
  );
};

export default Dashboard;
