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
    const { name, files } = e.target;
    if (name === "image") {
      setImage(files); // files is FileList, can be multiple
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData(); // ✅ use a different name than formData

    // Append text fields
    submitData.append("productName", formData.productName);
    submitData.append("productDescription", formData.productDescription);
    submitData.append("productPrice", formData.productPrice);
    submitData.append("productStock", formData.productStock);

    // Append image file
    if (image && image.length > 0) {
      submitData.append("image", image[0]);
    }

    try {
      setLoading(true);
      const response = await api.post("/host/add-product", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success", response.data);
      setSuccessMessageText("Product Added ");
      setTimeout(() => {
        navigate("/host/products"); // redirect after showing message
      }, 3100);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SuccessMessage
            message={successMessageText}
            onClose={() => setSuccessMessageText("")}
            duration={3000}
          ></SuccessMessage>

          <div
            className="bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl shadow-xl border mx-auto my-6
                w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
              Add Product
            </h2>

            <form
              action="/host/add-product"
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-4 sm:space-y-5"
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
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
              >
                Add Product
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default AddProduct;
