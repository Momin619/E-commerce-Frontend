import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LottieFeedback from "../animation-component/LottieFeedback";

function SuccessPayments() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // Hide after 3 seconds

    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, []);

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type={"payment-success"} />
        </div>
      )}

      {!showAnimation && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-0 text-center">
          <p className="mb-6 text-lg">
            Thank you! Your order has been placed successfully.
          </p>
          <Link
            to="/products"
            className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      )}
    </>
  );
}

export default SuccessPayments;
