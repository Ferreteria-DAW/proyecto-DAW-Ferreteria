import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import axios from "axios";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("No clasificado");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const { user } = useContext(UserContext);
  const token = user?.token;

  const navigate = useNavigate();

  const {id} = useParams();



  useEffect(() => {
    if (!token) navigate("/login");
  }, []);


  const PRODUCT_CATEGORIES = [
    "Cerrajeria",
    "Fontaneria",
    "Pintura",
    "Hogar",
    "Decoracion",
    "Iluminacion",
    "No clasificado",
  ];

  useEffect(() => {
    const getproduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
            setProductName(response.data.productName);
            setProductPrice(response.data.productPrice);
            setCategory(response.data.category);
            setProductDescription(response.data.productDescription);
        } catch(err) {
            setError(err);
        }
    }
    getproduct();
  }, [])

  const editProduct = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.set("productName", productName);
    productData.set("productPrice", productPrice);
    productData.set("category", category);
    productData.set("productDescription", productDescription);
    productData.set("thumbnail", thumbnail);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`,
        productData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        console.log('edición')
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="create-product">
      <div className="container">
        <h2>Editar Producto</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form
          action=""
          className="form create-product__form"
          onSubmit={editProduct}
        >
          <input
            type="text"
            placeholder="Producto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            autoFocus
          />
           <input
            type="number"
            placeholder="Precio"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <textarea
            placeholder="Descripción"
            name="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            name="thumbnail"
            id=""
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg, webp, avif"
          />
          <button type="submit" className="btn primary">
            Actualizar producto
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
