import { useUser } from "../../store/User";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";
function Navbar() {
  const navigate = useNavigate();
  const { isLogin, user, setUser, setIsLoggedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const onLogout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
      navigate("/login");
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.log(`Error occured while logging out `, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="text-xl font-bold text-blue-600">E-commerce</div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
              {isLogin ? (
                user.userType === "user" ? (
                  <>
                    <a
                      href="/products"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Products
                    </a>
                    <a
                      href="/favourites"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Favourites
                    </a>
                    <button
                      onClick={onLogout}
                      className="bg-red-600  cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                    >
                      Logout
                    </button>
                    <a href={`/profile`}>Profile</a>
                  </>
                ) : user.userType === "host" ? (
                  <>
                    <a
                      href="/host/products"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Host Products
                    </a>
                    <a
                      href="/host/add-product"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Add Product
                    </a>
                    <button
                      onClick={onLogout}
                      className="bg-red-600  cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                    >
                      Logout
                    </button>
                    <a href={`/profile`}>Profile</a>
                  </>
                ) : null
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

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
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
          <div className="md:hidden px-4 pb-4 space-y-2">
            {isLogin ? (
              user.userType === "user" ? (
                <>
                  <a
                    href="/products"
                    className="block text-gray-600 hover:text-blue-600"
                  >
                    Products
                  </a>
                  <a
                    href="/favourites"
                    className="block text-gray-600 hover:text-blue-600"
                  >
                    Favourites
                  </a>
                  <button
                    onClick={onLogout}
                    className="w-20 text-left bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                  >
                    Logout
                  </button>
                  <a href={`/profile`}>Profile</a>
                </>
              ) : user.userType === "host" ? (
                <>
                  <a
                    href="/host/home"
                    className="block text-gray-600 hover:text-blue-600"
                  >
                    Host Products
                  </a>
                  <a
                    href="/host/add-product"
                    className="block text-gray-600 hover:text-blue-600"
                  >
                    Add Product
                  </a>
                  <button
                    onClick={onLogout}
                    className="w-full text-left bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                  >
                    Logout
                  </button>
                  <a href={`/profile`}>Profile</a>
                </>
              ) : null
            ) : (
              <>
                <a
                  href="/signup"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Signup
                </a>
                <a
                  href="/login"
                  className="block text-gray-600 hover:text-blue-600"
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
