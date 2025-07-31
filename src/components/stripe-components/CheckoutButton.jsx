// CheckoutButton.jsx
import api from "../../api/api";
import { useState } from "react";
function CheckoutButton({ cartItems, setLoading }) {
  const [paying, setPaying] = useState(false);
  const handleCheckout = async () => {
    try {
      const sellerIds = cartItems
        .map((item) => item.productId.owner)
        .filter(Boolean);
      const uniqueSellerIds = [...new Set(sellerIds)];

      if (uniqueSellerIds.length > 1) {
        alert("You can only checkout products from one seller at a time.");
        return;
      }

      setPaying(true);
      setLoading(true); // start loading state immediately

      const simplifiedProducts = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        productName: item.productId.productName,
        productPrice: item.productId.productPrice,
        productImage: item.productId.productImage,
        ownerId: item.productId.owner,
      }));

      const res = await api.post("/api/stripe/create-checkout-session", {
        products: simplifiedProducts,
      });

      // Optional: short delay so user sees the "Paying..." state
      setTimeout(() => {
        window.location.href = res.data.url;
      }, 1000);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
      setPaying(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-black button text-white px-4 py-2 rounded"
      onClick={handleCheckout}
    >
      {paying ? "Paying..." : "Checkout"}
    </button>
  );
}

export default CheckoutButton;
