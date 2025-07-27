import { Link } from "react-router-dom";

function CancelPayment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Payment Cancelled ❌
      </h1>
      <p className="text-lg mb-6">
        You cancelled the payment. No money was charged.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </Link>
    </div>
  );
}

export default CancelPayment;
