import api from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading-component/Loading";
function ProductDetails() {
  const [product, setProduct] = useState({});
  const [ownerName, setOwnerName] = useState("");
  const [loading, setLoading] = useState(null);
  // Capitalize and space combined words (e.g., "JohnParker" -> "John Parker")
  function splitAndCapitalize(...names) {
    return names.map(
      (name) =>
        name
          .replace(/([A-Z])/g, " $1") // Insert space before capital letters
          .replace(/\s+/g, " ") // Replace multiple spaces with single space
          .trim() // Remove extra leading/trailing space
          .split(" ") // Split into words
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ") // Join words back with space
    );
  }

  const { id } = useParams();

  const productDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/product-detail/product/${id}`);
      const product = response.data.product;

      // Process owner name
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
      {/* Product Image */}
      <div className="h-64 sm:h-80 md:h-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        {product.productImage && (
          <img
            src={`https://e-commerce-backend-production-abe1.up.railway.app${
              product.productImage?.startsWith("/") ? "" : "/"
            }${product.productImage}`}
            alt={product.productName}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {product.productName}
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {product.productDescription}
        </p>
        <p className="text-gray-600 mb-1 font-medium">Owner: {ownerName}</p>
        <p className="text-xl sm:text-2xl font-semibold text-blue-600">
          ${product.productPrice}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
