import { useUser } from "../../store/User";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";
import { Link } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const { isLogin, user, setUser, setIsLoggedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const onLogout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Error occurred while logging out", error);
    } finally {
      setLoading(false);
    }
  };

  const renderUserLinks = (mobile = false) => (
    <>
      <a
        href="/home"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Home
      </a>
      <a
        href="/products"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Products
      </a>
      <a
        href="/favourites"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Favourites
      </a>
      <a
        href="/profile"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Profile
      </a>
      <a
        href="/cart"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Cart
      </a>

      <button
        onClick={onLogout}
        className={`${
          mobile
            ? "block  button w-full text-left text-red-600 bg-red-50 px-4 py-2 rounded hover:bg-red-100"
            : "text-red-600 border  button border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
        }`}
      >
        Logout
      </button>
    </>
  );

  const renderHostLinks = (mobile = false) => (
    <>
      <a
        href="/host/products"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Host Products
      </a>
      <a
        href="/host/add-product"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Add Product
      </a>
      <a
        href="/profile"
        className={`${
          mobile ? "block py-2" : ""
        } text-gray-600 hover:text-blue-600`}
      >
        Profile
      </a>

      {user?.userType === "host" && (
        <Link
          to="/connect-stripe"
          className="block py-2 text-gray-600 hover:text-blue-600"
        >
          Connect Stripe
        </Link>
      )}

      <button
        onClick={onLogout}
        className={`${
          mobile
            ? "block w-full text-left button  text-red-600 bg-red-50 px-4 py-2 rounded hover:bg-red-100"
            : "text-red-600 border  button border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
        }`}
      >
        Logout
      </button>
    </>
  );

  return (
    <>
      {loading && <Loading />}

      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="text-xl font-bold button"
              onClick={() => navigate("/")}
            >
              <span style={{ color: "#2F3F4D" }}>Cart</span>
              <span style={{ color: "#0497FF" }}>Plus</span>
            </div>

            {/* Desktop Menu */}
            <div className="items-center hidden space-x-6 md:flex">
              {isLogin ? (
                user.userType === "host" ? (
                  renderHostLinks()
                ) : (
                  renderUserLinks()
                )
              ) : (
                <>
                  <a
                    href="/signup"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Signup
                  </a>
                  <a
                    href="/login"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Login
                  </a>
                </>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 button hover:text-blue-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute z-50 px-4 py-2 mt-2 space-y-1 bg-white rounded shadow-md right-4 w-fit">
            {isLogin ? (
              user.userType === "host" ? (
                renderHostLinks(true)
              ) : (
                renderUserLinks(true)
              )
            ) : (
              <>
                <a
                  href="/signup"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                >
                  Signup
                </a>
                <a
                  href="/login"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                >
                  Login
                </a>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
