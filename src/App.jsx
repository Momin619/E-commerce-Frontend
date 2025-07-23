// Authorization and Authentication components

import SignUp from "./components/auth-components/SignUp";
import Login from "./components/auth-components/Login";

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

// host components
import AddProduct from "./components/host-components/AddProduct";
import HostProducts from "./components/host-components/HostProducts";
import EditProduct from "./components/host-components/EditProduct";

// user components

import Products from "./components/user-components/Products";
import ProductDetails from "./components/user-components/ProductDetails";
import Favourites from "./components/user-components/Favourites";
// react states
import { useEffect } from "react";
import { useUser } from "./store/User";

// axios instance
import api from "./api/api";
function App() {
  const redirect = useNavigate();
  const location = useLocation();
  const { setUser, setIsLoggedIn } = useUser();

  const publicRoutes = ["/login", "/signup"];
  const checkSession = async () => {
    try {
      const res = await api.get("/me");
      const currentPath = location.pathname;

      if (!res.data.isLoggedIn && !res.data.user) {
        // If user is not logged in and current route is NOT public, redirect
        if (!publicRoutes.includes(currentPath)) {
          redirect("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkSession();
  }, [location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
        setIsLoggedIn(res.data.isLoggedIn);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

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
      </Routes>
    </>
  );
}

export default App;
