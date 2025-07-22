import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Loading from "../loading-component/Loading";

function HostProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHostProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/host/products", {
        withCredentials: true,
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/host/delete-product/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data.message);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostProducts();
  }, []);

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
              className="bg-white shadow-md rounded-2xl overflow-hidden  hover:shadow-xl transition duration-300 h-full flex flex-col"
            >
              {product.productImage ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${
                    product.productImage
                  }`}
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

                <p className="text-gray-700 mb-3 min-h-[60px]">
                  {product.productDescription?.slice(0, 100) ||
                    "No description"}
                  ...
                </p>

                <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-green-600 font-bold text-xl w-[80px] text-center">
                    ${product.productPrice}
                  </span>

                  <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <a
                      className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-700"
                      href={`/host/edit-product/product/${product._id}`}
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 cursor-pointer text-white px-5 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
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

export default HostProducts;
