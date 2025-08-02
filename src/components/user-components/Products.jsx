import api from "../../api/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../loading-component/Loading";
import { motion } from "framer-motion";
import LottieFeedback from "../animation-component/LottieFeedback";
import Filter from "../user-components/Filter";
import Footer from "../ui/Footer";
function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/products${location.search}`);
      const fetchedProducts = response?.data?.products ?? [];
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  const handleAddFavouriteProduct = async (id) => {
    setLoading(true);
    try {
      await api.post(`/favourite-product/product/${id}`);
      setAction("favourite");
      setShowAnimation(true);
      setTimeout(() => navigate("/favourites"), 3000);
    } catch (error) {
      console.error("Error adding to favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (id) => {
    setLoading(true);
    try {
      await api.post(`/add-to-cart/cart-item/${id}`, {
        productId: id,
        quantity: 1,
      });
      setAction("cart");
      setShowAnimation(true);
      setTimeout(() => navigate("/cart"), 1600);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      {showAnimation && action && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type={action} />
        </div>
      )}

      <div className="flex flex-col min-h-screen lg:flex-row">
        {/* Sidebar Filter */}
        <aside className="w-full p-4 lg:w-[280px]">
          <Filter />
        </aside>

        {/* Product Grid */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow px-6 py-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Your Products
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col bg-white shadow rounded-2xl hover:shadow-md transition duration-300 w-full max-w-[280px] min-h-[460px] p-4"
                >
                  {/* Image */}
                  {product.productImage ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${
                        product.productImage
                      }`}
                      alt={product.productName}
                      className="object-cover w-full h-48 rounded-t-2xl"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400 bg-gray-100 rounded-t-2xl">
                      No Image
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex flex-col flex-grow p-2">
                    <h3 className="mb-1 text-lg font-semibold">
                      {product.productName}
                    </h3>
                    <p className="text-sm text-gray-600 flex-grow min-h-[60px] mb-2">
                      {product.productDescription?.slice(0, 100) ??
                        "No description"}
                      ...
                    </p>

                    <div className="mb-2 text-xl font-bold text-green-600">
                      ${product.productPrice}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      <a
                        href={`/product-detail/product/${product._id}`}
                        className="px-3 py-2 text-sm text-white bg-blue-600 rounded-md button hover:bg-blue-700"
                      >
                        Details
                      </a>
                      <button
                        onClick={() => handleAddFavouriteProduct(product._id)}
                        className="px-3 py-2 text-sm text-white bg-red-600 rounded-md button hover:bg-red-700"
                      >
                        Favourite
                      </button>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="px-3 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 button"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.main>
      </div>
      <Footer />
    </>
  );
}

export default Products;
