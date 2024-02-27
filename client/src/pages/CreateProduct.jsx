import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import axios from "axios";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("No clasificado");
  const [productDescription, setProductDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const { user } = useContext(UserContext);
  const token = user?.token;

  const navigate = useNavigate();



  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const PRODUCT_CATEGORIES = [
    "Cerrajeria",
    "Fontaneria",
    "Pintura",
    "Hogar",
    "Decoracion",
    "Iluminacion",
    "No clasificado",
  ];

  const createProduct = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.set("productName", productName);
    productData.set("category", category);
    productData.set("productDescription", productDescription);
    productData.set("thumbnail", thumbnail);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products`,
        productData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 201) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="create-product">
      <div className="container">
        <h2>Create product</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form
          action=""
          className="form create-product__form"
          onSubmit={createProduct}
        >
          <input
            type="text"
            placeholder="Producto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            autoFocus
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
          <ReactQuill
            modules={modules}
            formats={formats}
            value={productDescription}
            onChange={setProductDescription}
          />
          <input
            type="file"
            name="thumbnail"
            id=""
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg, webp, avif"
          />
          <button type="submit" className="btn primary">
            Crear producto
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;