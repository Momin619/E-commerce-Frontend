// App.jsx
import "./assets/utils.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./store/User";
import api from "./api/api";

// Components
import Navbar from "./components/ui/Navbar";
import SignUp from "./components/auth-components/SignUp";
import Login from "./components/auth-components/Login";
import Profile from "./components/user-components/Profile";
import Cart from "./components/user-components/Cart";
import Error from "./components/error-component/Error";
import AddProduct from "./components/host-components/AddProduct";
import HostProducts from "./components/host-components/HostProducts";
import EditProduct from "./components/host-components/EditProduct";
import Products from "./components/user-components/Products";
import ProductDetails from "./components/user-components/ProductDetails";
import Favourites from "./components/user-components/Favourites";
import ConnectStripe from "./components/stripe-components/ConnectStripe";
import SuccessPayment from "./components/stripe-components/SuccessPayment";
import CancelPayment from "./components/stripe-components/CancelPayment";

function App() {
  const { setUser, setIsLoggedIn, isLogin } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const res = await api.get("/me");
      const { user, isLoggedIn } = res.data;
      setUser(user);
      setIsLoggedIn(isLoggedIn);

      // Redirect to login only if accessing a protected route without login
      const publicRoutes = ["/login", "/signup"];
      if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Session check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin === null) {
      fetchSession();
    } else {
      setLoading(false); // Already logged in
    }
  }, []); // only once on app load

  if (loading) return <div className="p-10 text-center"></div>;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* User routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/product-detail/product/:id"
          element={<ProductDetails />}
        />
        <Route path="/favourites" element={<Favourites />} />

        {/* Host routes */}
        <Route path="/host/add-product" element={<AddProduct />} />
        <Route path="/host/products" element={<HostProducts />} />
        <Route
          path="/host/edit-product/product/:id"
          element={<EditProduct />}
        />

        {/* Stripe */}
        <Route path="/stripe/success" element={<SuccessPayment />} />
        <Route path="/stripe/failed" element={<CancelPayment />} />
        <Route path="/connect-stripe" element={<ConnectStripe />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
