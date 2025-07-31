import api from "../../api/api";
import { useState } from "react";
import SuccessMessage from "../ui/SuccessMessage";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";

function AddProduct() {
  const navigate = useNavigate();
  const [successMessageText, setSuccessMessageText] = useState("");
  const [loading, setLoading] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
    productCategory: "",
  });

  const [image, setImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setImage(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      submitData.append(key, value)
    );

    if (image && image.length > 0) {
      submitData.append("image", image[0]);
    }

    try {
      setLoading(true);
      const response = await api.post("/host/add-product", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessageText("Product Added");
      setTimeout(() => {
        navigate("/host/products");
      }, 3100);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <SuccessMessage
        message={successMessageText}
        onClose={() => setSuccessMessageText("")}
        duration={3000}
      />

      <div className="bg-white px-6 py-8 rounded-2xl shadow-xl border mx-auto my-6 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[70%]">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleOnChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Description
            </label>
            <textarea
              name="productDescription"
              rows="3"
              value={formData.productDescription}
              onChange={handleOnChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price & Stock in a Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Product Price
              </label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleOnChange}
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Product Stock
              </label>
              <input
                type="number"
                name="productStock"
                value={formData.productStock}
                onChange={handleOnChange}
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleOnChange}
              required
              className="w-full p-3 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Select a Category --
              </option>
              <option value="Electronics">📱 Electronics</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Food">🍔 Food</option>
              <option value="Accessories">🎒 Accessories</option>
              <option value="Other">🔧 Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 button"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
