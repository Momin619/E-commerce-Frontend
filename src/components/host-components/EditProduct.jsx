import api from "../../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";

function EditProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
  });
  const [image, setImage] = useState(null);

  // Fetch product data
  const fetchEditProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/host/edit-product/product/${id}`);
      const fetchedProduct = response.data.product;
      setProduct(fetchedProduct);

      setFormData({
        productName: fetchedProduct.productName || "",
        productDescription: fetchedProduct.productDescription || "",
        productPrice: fetchedProduct.productPrice || "",
        productStock: fetchedProduct.productStock || "",
      });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditProduct();
  }, [id]);

  // Handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("productName", formData.productName);
    submitData.append("productDescription", formData.productDescription);
    submitData.append("productPrice", formData.productPrice);
    submitData.append("productStock", formData.productStock);

    if (image) {
      submitData.append("image", image);
    }

    try {
      setLoading(true);

      await api.put(`/host/edit-product/product/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Remove these:
          // method: "PUT", <-- already set by axios.put
          // credentails: "include" <-- typo + unnecessary
        },
        withCredentials: true, // correct way to include cookies/session
      });

      navigate("/host/products");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div
      className="bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl shadow-xl border mx-auto my-6
                w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Product
      </h2>

      <form
        className="space-y-4 sm:space-y-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Name
          </label>
          <input
            onChange={handleOnChange}
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="productDescription"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Description
          </label>
          <textarea
            onChange={handleOnChange}
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            required
            rows="3"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="productPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Price
          </label>
          <input
            onChange={handleOnChange}
            type="number"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Stock */}
        <div>
          <label
            htmlFor="productStock"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Stock
          </label>
          <input
            onChange={handleOnChange}
            type="number"
            id="productStock"
            name="productStock"
            value={formData.productStock}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Image */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Image (optional)
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Show current image if exists */}
        {product?.imageUrl && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Image:</p>
            <img
              src={product.imageUrl}
              alt="Product"
              loading="lazy"
              className="w-32 rounded shadow-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
