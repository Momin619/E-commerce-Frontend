import api from "../../api/api";
import { useState, useEffect } from "react";

function Order() {
  const [orders, setOrders] = useState([]);

  const handleOrders = async () => {
    const response = await api.get("/host/orders");
    const orders = response.data.orders;
    console.log(orders);
    setOrders(orders);
  };

  useEffect(() => {
    handleOrders();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Buyer: {order.buyer.name}
              </h3>
              <p className="mb-1 text-sm text-gray-600">
                Email: {order.buyer.email}
              </p>
              <p className="mb-1 text-sm text-gray-600">
                Total:{" "}
                <span className="font-medium text-black">
                  Rs. {order.totalAmount}
                </span>
              </p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>

              {/* Products inside the order */}
              <div className="mt-4 space-y-4">
                {order.products.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex items-center gap-4 p-2 rounded-lg bg-gray-50"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="object-cover w-16 h-16 rounded-md"
                    />
                    <div>
                      <p className="text-sm font-semibold">{prod.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {prod.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Price: Rs. {prod.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
