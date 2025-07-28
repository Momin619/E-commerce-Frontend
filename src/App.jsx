// Authorization and Authentication components
import "./assets/utils.css";
import SignUp from "./components/auth-components/SignUp";
import Login from "./components/auth-components/Login";
// src/App.jsx or wherever you define routes
import ConnectStripe from "./components/stripe-components/ConnectStripe";

// inside your <Routes>

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
// ui components

import Navbar from "./components/ui/Navbar";
import Profile from "./components/ui/Profile";
import Cart from "./components/ui/Cart";
import Error from "./components/error-component/Error";
// host components
import AddProduct from "./components/host-components/AddProduct";
import HostProducts from "./components/host-components/HostProducts";
import EditProduct from "./components/host-components/EditProduct";

// user components

import Products from "./components/user-components/Products";
import ProductDetails from "./components/user-components/ProductDetails";
import Favourites from "./components/user-components/Favourites";

// Stripe components

import SuccessPayment from "./components/stripe-components/SuccessPayment";
import CancelPayment from "./components/stripe-components/CancelPayment";

// react states
import { useEffect, useState } from "react";
import { useUser } from "./store/User";

// axios instance
import api from "./api/api";
function App() {
  const redirect = useNavigate();
  const location = useLocation();
  const { setUser, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const publicRoutes = ["/login", "/signup"];
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get("/me");
        const { user, isLoggedIn } = res.data;
        setUser(user);
        setIsLoggedIn(isLoggedIn);

        if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
          redirect("/login");
        }
      } catch (err) {
        console.error("Session error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [location.pathname]);
  if (loading) return <div className="p-10 text-center"></div>;
  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      {/* Define routes for all components */}
      <Routes>
        {/* Auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

        {/* Host-specific routes */}
        <Route path="/host/add-product" element={<AddProduct />} />
        <Route path="/host/products" element={<HostProducts />} />
        <Route
          path="/host/edit-product/product/:id"
          element={<EditProduct />}
        />

        {/* User-accessible routes */}
        <Route path="/products" element={<Products />} />
        <Route
          path="/product-detail/product/:id"
          element={<ProductDetails />}
        />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/stripe/success" element={<SuccessPayment />} />
        <Route path="/stripe/failed" element={<CancelPayment />} />
        <Route path="/connect-stripe" element={<ConnectStripe />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
