import { useEffect, useState } from "react";
import api from "../../api/api";
import { Minus, Plus, Trash2 } from "lucide-react";
import Loading from "../loading-component/Loading";
import CheckoutButton from "../stripe-components/CheckoutButton";
import LottieFeedback from "../animation-component/LottieFeedback";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../ui/Footer";
function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("1");
  const [showAnimation, setShowAnimation] = useState(false);
  console.log(cart);
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart");
      const cartItems = res.data.cartItems || [];
      const filteredCart = cartItems.filter((item) => item.productId !== null);
      console.log(filteredCart);
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
      console.log("Called remove from cart handler");
      await api.post(`/remove-from-cart/item/${id}`);
      setAction("remove-from-cart");
      setShowAnimation(true);

      // Wait 2 seconds before fetching cart and hiding animation
      setTimeout(() => {
        fetchCart();
        setShowAnimation(false);
      }, 2630); // 2 seconds delay
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const [showEmptyAnimation, setShowEmptyAnimation] = useState(true);

  useEffect(() => {
    if (cart.length === 0) {
      setShowEmptyAnimation(true);
      const timer = setTimeout(() => {
        setShowEmptyAnimation(false);
      }, 2600); // Hide animation after 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [cart]);

  if (loading) return <Loading />;

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.productId?.productPrice || 0) * (item.quantity || 0),
    0
  );
  return (
    <div className="flex flex-col min-h-screen">
      {showAnimation && action && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type={action} />
        </div>
      )}

      <div className="flex-grow max-w-4xl p-4 mx-auto sm:p-6">
        <h2 className="mb-6 text-3xl font-bold text-center">Cart</h2>

        {cart.length === 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={showEmptyAnimation ? "animation" : "button"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col items-center justify-center gap-8 ${
                showEmptyAnimation ? "mt-30" : "mt-0"
              }`}
            >
              {showEmptyAnimation ? (
                <LottieFeedback type="empty-cart" width={250} height={250} />
              ) : (
                <a
                  href="/products"
                  className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Go to Shopping
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            {cart.map((item) => {
              const product = item.productId;
              return (
                <div
                  key={product._id}
                  className="flex flex-col gap-4 py-4 border-b sm:flex-row sm:items-center"
                >
                  <div className="flex-shrink-0 w-full h-32 overflow-hidden bg-gray-100 rounded sm:w-32">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${
                        product.productImage
                      }`}
                      alt={product.productName}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {product.productName}
                    </h3>
                    <h3 className="text-lg font-semibold">
                      Stock : {product.productStock}
                    </h3>
                    <p className="text-gray-600">
                      Price: ${product.productPrice || 0}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="p-1 bg-gray-200 rounded button hover:bg-gray-300"
                        onClick={() => decreaseQuantity(product._id)}
                        title="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="p-1 bg-gray-200 rounded button hover:bg-gray-300"
                        onClick={() => increaseQuantity(product._id)}
                        title="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 ml-2 text-white bg-red-500 rounded button hover:bg-red-600"
                        onClick={() => removeFromCart(product._id)}
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="font-semibold text-right sm:text-left">
                    ${(product.productPrice || 0) * item.quantity}
                  </div>
                </div>
              );
            })}

            <div className="mt-6 text-right">
              <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
              {<CheckoutButton cartItems={cart} setLoading={setLoading} />}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
