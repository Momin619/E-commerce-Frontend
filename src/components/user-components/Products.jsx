import api from "../../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";
import { motion } from "framer-motion";
import LottieFeedback from "../animation-component/LottieFeedback";
import { Link } from "react-router-dom";
function Products() {
  const redirect = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [action, setAction] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      const products = response.data.products;
      setProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddFavouriteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await api.post(`/favourite-product/product/${id}`);
      setShowAnimation(true);
      setAction("favourite");

      setTimeout(() => {
        redirect("/favourites"); // redirect after showing message
      }, 3100);

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (id) => {
    console.log("Product ids from handle add to cart is ", id);
    try {
      setLoading(true);

      // Get product list and find product by id

      // Post to cart with full product info
      const res = await api.post(`/add-to-cart/cart-item/${id}`, {
        productId: id,
      });
      setShowAnimation(true);
      setAction("cart");

      setTimeout(() => {
        redirect("/cart"); // redirect after showing message
      }, 1600);

      return res;
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="p-6">
          <h2 className="mb-6 text-3xl font-bold text-center">Your Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No products available.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col h-full overflow-hidden transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
                >
                  {product.productImage ? (
                    <img
                      src={`https://e-commerce-backend-production-abe1.up.railway.app${
                        product.productImage?.startsWith("/") ? "" : "/"
                      }${product.productImage}`}
                      alt={product.productName}
                      className="object-cover w-full h-48"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-48 text-gray-500 bg-gray-200">
                      No Image
                    </div>
                  )}

                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 text-xl font-semibold">
                      {product.productName}
                    </h3>
                    <p className="text-gray-700 min-h-[60px]">
                      {product.productDescription?.slice(0, 100) ||
                        "No description"}
                      ...
                    </p>

                    <div className="flex flex-col gap-3 mt-auto">
                      <span className="text-xl font-bold text-left text-green-600">
                        ${product.productPrice}
                      </span>

                      <div className="flex flex-wrap gap-3">
                        <a
                          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                          href={`/product-detail/product/${product._id}`}
                        >
                          Details
                        </a>

                        <button
                          className="px-5 py-2 text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
                          onClick={() => handleAddFavouriteProduct(product._id)}
                        >
                          Favourites
                        </button>

                        <button
                          className="px-5 py-2 text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Products;
