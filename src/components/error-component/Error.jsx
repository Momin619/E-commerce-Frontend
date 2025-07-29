import { Link } from "react-router-dom";
import { useUser } from "../../store/User";
import LottieFeedback from "../animation-component/LottieFeedback";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Error() {
  const { user } = useUser();
  const [action] = useState("404-error");
  const [showAnimation, setShowAnimation] = useState(true);

  const redirectTo = user.userType === "user" ? "/products" : "/host/products";
  const content =
    user.userType === "user" ? "Go to Products" : "Go to Host Products";

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          {/* Centered animation */}
          <div className="z-10 flex items-center justify-center">
            <LottieFeedback
              width={300}
              height={300}
              type={action}
              loop={true}
            />
          </div>

          {/* Button below and forward */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="z-20 mt-36"
          >
            <Link
              to={redirectTo}
              className="inline-block px-6 py-3 text-white transition bg-indigo-600 rounded-lg shadow hover:bg-indigo-700"
            >
              {content}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Error;
