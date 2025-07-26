import { useEffect, useState } from "react";
import api from "../../api/api";
import { Minus, Plus, Trash2 } from "lucide-react";
import Loading from "../loading-component/Loading";
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart");
      const cartItems = res.data.cartItems || [];
      const filteredCart = cartItems.filter((item) => item.productId !== null);
      setCart(filteredCart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (id) => {
    try {
      await api.post(`/add-to-cart/cart-item/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Increase failed", err);
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      await api.post(`/decrease-cart/cart-item/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Decrease failed", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await api.post(`/remove-from-cart/item/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Loading />;

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.productId?.productPrice || 0) * (item.quantity || 0),
    0
  );

  const makePayment = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      products: cart, // Your cart state
    };

    const response = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => {
            const product = item.productId;
            return (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row gap-4 sm:items-center border-b py-4"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                  <img
                    src={`https://e-commerce-backend-production-abe1.up.railway.app${product.productImage}`}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info + Actions */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600">
                    Price: ${product.productPrice || 0}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                      onClick={() => decreaseQuantity(product._id)}
                      title="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                      onClick={() => increaseQuantity(product._id)}
                      title="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer ml-2"
                      onClick={() => removeFromCart(product._id)}
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total for this product */}
                <div className="font-semibold text-right sm:text-left">
                  ${(product.productPrice || 0) * item.quantity}
                </div>
              </div>
            );
          })}

          {/* Total Amount */}
          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={makePayment}
              disabled={isPaying || cart.length === 0}
              className={`bg-blue-500 my-10 text-white p-2 rounded cursor-pointer ${
                isPaying ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPaying ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
