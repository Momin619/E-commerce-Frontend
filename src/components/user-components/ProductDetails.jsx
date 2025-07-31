import api from "../../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [ownerName, setOwnerName] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate(); // <-- for navigation

  function splitAndCapitalize(...names) {
    return names.map((name) =>
      name
        .replace(/([A-Z])/g, " $1")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );
  }

  const { id } = useParams();

  const productDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/product-detail/product/${id}`);
      const product = response.data.product;

      const ownerFirstName = product.owner.firstName;
      const ownerLastName = product.owner.lastName;
      const fullName = splitAndCapitalize(ownerFirstName, ownerLastName).join(
        " "
      );
      setOwnerName(fullName);

      setProduct(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productDetails();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image Container with fixed ratio */}
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        {product.productImage ? (
          <img
            src={`https://e-commerce-backend-production-abe1.up.railway.app${
              product.productImage?.startsWith("/") ? "" : "/"
            }${product.productImage}`}
            alt={product.productName}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col justify-between space-y-4 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {product.productName}
        </h2>

        <div className="text-gray-600 text-sm max-h-[150px] overflow-auto leading-relaxed border p-3 rounded-md bg-gray-50">
          {product.productDescription || "No description available."}
        </div>

        <p className="font-medium text-gray-600">
          <strong>Owner:</strong> {ownerName}
        </p>

        <p className="text-xl font-semibold text-blue-600 sm:text-2xl">
          ${product.productPrice}
        </p>

        {/* Back to Products Button */}
        <button
          onClick={() => navigate("/products")}
          className="w-full px-4 py-2 mt-4 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700 button"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
