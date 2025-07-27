// src/components/ConnectStripe.js
import { useState } from "react";
import api from "../../api/api"; // axios instance

function ConnectStripe() {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/stripe/connect");
      console.log(res);
      window.location.href = res.data.url; // Redirect to onboarding
    } catch (err) {
      console.error("Stripe connect error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-8">
      <button
        onClick={handleConnect}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Connect with Stripe"}
      </button>
    </div>
  );
}

export default ConnectStripe;
