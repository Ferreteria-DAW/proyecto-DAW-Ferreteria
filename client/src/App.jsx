import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsFormPage from "./pages/ProductsFormPage";
import ProductsPage from "./pages/ProductsPage";
import { Navbar } from "./components/ui/Navbar";
import { ProductProvider } from "./context/ProductsContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<ProductsFormPage />} />
            <Route path="/products/:id" element={<ProductsFormPage />} />
            {/* <Route path="/profile" element={<h1>Profile</h1>} /> */}
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
