import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';

// Customer storefront layouts & pages
import UserLayout from './layouts/UserLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin layouts & pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductNew from './pages/admin/AdminProductNew';
import AdminProductEdit from './pages/admin/AdminProductEdit';
import AdminLogin from './pages/admin/AdminLogin';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer-Facing Storefront Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<ProductDetails />} />
            <Route path="categories/:slug" element={<CategoryPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Panel Nested Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductNew />} />
            <Route path="products/:id/edit" element={<AdminProductEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
    </AuthProvider>
  );
}
