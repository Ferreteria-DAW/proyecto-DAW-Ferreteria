import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index2.css';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateProduct from './pages/CreateProduct';
import ErrorPage from './pages/ErrorPage';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
import CategoryProducts from './pages/CategoryProducts';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import ProductsPage from './pages/ProductsPage';
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'products/:id', element: <ProductDetail />},
      {path: 'register', element: <Register />},
      {path: 'login', element: <Login />},
      {path: 'profile/:id', element: <Profile />},
      {path: 'create', element: <CreateProduct />},
      {path: 'products', element: <ProductsPage />},
      {path: 'products/:id/edit', element: <EditProduct />},
      {path: 'products/:id/delete', element: <DeleteProduct />},
      {path: 'products/categories/:category', element: <CategoryProducts />},
      {path: 'myproducts/:id', element: <Dashboard />},
      {path: 'logout', element: <Logout />},
    ]

  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

