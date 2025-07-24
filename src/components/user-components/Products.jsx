import api from "../../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";

function Products() {
  const redirect = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);

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
      redirect("/favourites");

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      setLoading(true);

      // Get product list and find product by id
      const response = await api.get("/products");
      const products = response.data.products;
      const product = products.find((p) => p._id === id);
      console.log(product);
      if (!product) {
        alert("Product not found.");
        return;
      }

      // Post to cart with full product info
      const res = await api.post(`/add-to-cart/cart-item/${id}`, {
        name: product.productName,
        price: product.productPrice,
        image: product.productImage,
      });

      alert("Added to cart!");
      redirect("/cart");
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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 h-full flex flex-col"
            >
              {product.productImage ? (
                <img
                  src={`https://e-commerce-backend-production-abe1.up.railway.app${product.productImage}`}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">
                  {product.productName}
                </h3>
                <p className="text-gray-700 min-h-[60px]">
                  {product.productDescription?.slice(0, 100) ||
                    "No description"}
                  ...
                </p>

                <div className="mt-auto flex flex-col gap-3">
                  <span className="text-green-600 font-bold text-xl text-left">
                    ${product.productPrice}
                  </span>

                  <div className="flex flex-wrap gap-3">
                    <a
                      className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                      href={`/product-detail/product/${product._id}`}
                    >
                      Details
                    </a>

                    <button
                      className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
                      onClick={() => handleAddFavouriteProduct(product._id)}
                    >
                      Favourites
                    </button>

                    <button
                      className="bg-green-600 cursor-pointer text-white px-5 py-2 rounded-md hover:bg-green-700"
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
  );
}

export default Products;
