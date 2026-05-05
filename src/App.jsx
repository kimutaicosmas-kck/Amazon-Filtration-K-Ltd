import React, { useEffect, useState } from "react";

import { Routes, Route, Navigate, useNavigate, useParams, Outlet } from "react-router-dom";

import Navbar from "../Navbar.js";

import Footer from "../Footer.js";

import ScrollToTop from "../ScrollToTop.js";

import ErrorBoundary from "../ErrorBoundary.js";

import HomePage from "../HomePage.js";

import ProductsPage from "../ProductsPage.js";

import ProductLinePage from "../ProductLinePage.js";

import ProductDetailPage from "../ProductDetailPage.js";

import IndustriesPage from "../IndustriesPage.js";


import AboutPage from "../AboutPage.js";

import ContactPage from "../ContactPage.js";

import NotFoundPage from "../NotFoundPage.js";

import AdminLogin from "../AdminLogin.js";

import AdminDashboard from "../AdminDashboard.js";

import AdminProductForm from "../AdminProductForm.js";



const apiRoot = () =>

  typeof window !== "undefined" && window.__AMAZON_API_BASE__ !== undefined

    ? window.__AMAZON_API_BASE__

    : "";



function useAdminSessionOk() {

  const [ok, setOk] = useState(null);

  useEffect(() => {

    const authData = localStorage.getItem("adminAuth");

    if (!authData) {

      setOk(false);

      return;

    }

    try {

      const session = JSON.parse(authData);

      const now = Date.now();

      const sessionTimeout = 24 * 60 * 60 * 1000;

      if (!session.authenticated || now - session.timestamp > sessionTimeout) {

        localStorage.removeItem("adminAuth");

        setOk(false);

        return;

      }

      setOk(true);

    } catch {

      localStorage.removeItem("adminAuth");

      setOk(false);

    }

  }, []);

  return ok;

}



function AdminSessionGate({ children }) {

  const ok = useAdminSessionOk();

  if (ok === null) return null;

  if (!ok) return <Navigate to="/admin" replace />;

  return children;

}



function AdminNewProductPage() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-50 py-8">

      <AdminProductForm

        product={null}

        onSave={() => navigate("/admin/dashboard")}

        onCancel={() => navigate("/admin/dashboard")}

      />

    </div>

  );

}



function AdminEditProductPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [error, setError] = useState("");



  useEffect(() => {

    let cancelled = false;

    (async () => {

      try {

        const url = `${apiRoot()}/backend-php/api/products.php?id=${encodeURIComponent(id)}`;

        const res = await fetch(url);

        const data = await res.json();

        if (cancelled) return;

        if (data.success && data.product) {

          setProduct(data.product);

        } else {

          setError(data.error || "Product not found");

        }

      } catch (e) {

        if (!cancelled) setError(e.message || "Failed to load product");

      }

    })();

    return () => {

      cancelled = true;

    };

  }, [id]);



  if (error) {

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

        <p className="text-red-600">{error}</p>

      </div>

    );

  }

  if (!product) {

    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading…</div>;

  }



  return (

    <div className="min-h-screen bg-gray-50 py-8">

      <AdminProductForm

        product={product}

        onSave={() => navigate("/admin/dashboard")}

        onCancel={() => navigate("/admin/dashboard")}

      />

    </div>

  );

}



function SiteLayout() {

  return (

    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-1">

        <Outlet />

      </main>

      <Footer />

    </div>

  );

}



export default function App() {

  return (

    <ErrorBoundary>

      <ScrollToTop />

      <Routes>

        <Route element={<SiteLayout />}>

          <Route path="/" element={<HomePage />} />

          <Route path="/products/line/:lineSlug" element={<ProductLinePage />} />

          <Route path="/products/:productId" element={<ProductDetailPage />} />

          <Route path="/products" element={<ProductsPage />} />

          <Route path="/manufacturing-range" element={<Navigate to="/products" replace />} />

          <Route path="/product/*" element={<Navigate to="/products" replace />} />

          <Route path="/industries" element={<IndustriesPage />} />

          <Route path="/services/*" element={<Navigate to="/contact" replace />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/vision" element={<Navigate to="/about" replace />} />

          <Route path="/support" element={<Navigate to="/contact" replace />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route

            path="/admin/dashboard"

            element={

              <AdminSessionGate>

                <AdminDashboard />

              </AdminSessionGate>

            }

          />

          <Route

            path="/admin/products/new"

            element={

              <AdminSessionGate>

                <AdminNewProductPage />

              </AdminSessionGate>

            }

          />

          <Route

            path="/admin/products/:id/edit"

            element={

              <AdminSessionGate>

                <AdminEditProductPage />

              </AdminSessionGate>

            }

          />

          <Route path="*" element={<NotFoundPage />} />

        </Route>

      </Routes>

    </ErrorBoundary>

  );

}


