import { Link } from "react-router-dom";

function SuccessPayments() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="text-lg mb-6">
        Thank you! Your order has been placed successfully.
      </p>
      <Link
        to="/products"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default SuccessPayments;
