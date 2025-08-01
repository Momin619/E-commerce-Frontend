import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Loading from "../loading-component/Loading";
import SuccessMessage from "../ui/SuccessMessage";
import { useNavigate } from "react-router-dom";
function HostProducts() {
  const redirect = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessageText, setSuccessMessageText] = useState("");
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
        `https://e-commerce-backend-production-abe1.up.railway.app/host/delete-product/${productId}`,
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
      setSuccessMessageText("Product Deleted ");
      setTimeout(() => {
        redirect("/host/products"); // redirect after showing message
      }, 3100);
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
    <>
      <SuccessMessage
        message={successMessageText}
        onClose={() => setSuccessMessageText("")}
        duration={3000}
      ></SuccessMessage>
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
                    src={`${import.meta.env.VITE_API_URL}${
                      product.productImage
                    }`}
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

                  <p className="text-gray-700 mb-3 min-h-[60px]">
                    {product.productDescription?.slice(0, 100) ||
                      "No description"}
                    ...
                  </p>

                  <div className="flex flex-col gap-3 mt-auto sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-green-600 font-bold text-xl w-[80px] text-center">
                      ${product.productPrice}
                    </span>

                    <div className="flex justify-center w-full gap-3 sm:w-auto sm:justify-end">
                      <a
                        className="px-5 py-2 text-white bg-blue-600 rounded-md button hover:bg-blue-700"
                        href={`/host/edit-product/product/${product._id}`}
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-5 py-2 text-white bg-red-600 rounded-md button hover:bg-red-700"
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
    </>
  );
}

export default HostProducts;
