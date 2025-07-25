import { useUser } from "../../store/User";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";

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
      <a href="/cart">Cart</a>
      <button
        onClick={onLogout}
        className={`${
          mobile
            ? "block  cursor-pointer w-full text-left text-red-600 bg-red-50 px-4 py-2 rounded hover:bg-red-100"
            : "text-red-600 border  cursor-pointer border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
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
      <button
        onClick={onLogout}
        className={`${
          mobile
            ? "block w-full text-left cursor-pointer  text-red-600 bg-red-50 px-4 py-2 rounded hover:bg-red-100"
            : "text-red-600 border  cursor-pointer border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
        }`}
      >
        Logout
      </button>
    </>
  );

  return (
    <>
      {loading && <Loading />}

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="text-xl font-bold text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              E-commerce
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
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
                className="text-gray-600 hover:text-blue-600 cursor-pointer focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
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
          <div className="absolute right-4 mt-2 bg-white shadow-md rounded px-4 py-2 w-fit space-y-1 z-50">
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
                  className="block text-gray-600 hover:text-blue-600 py-2"
                >
                  Signup
                </a>
                <a
                  href="/login"
                  className="block text-gray-600 hover:text-blue-600 py-2"
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
