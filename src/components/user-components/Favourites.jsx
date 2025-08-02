import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Loading from "../loading-component/Loading";
import LottieFeedback from "../animation-component/LottieFeedback";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../ui/Footer";
function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(null);
  const [action, setAction] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const redirect = useNavigate();

  const fetchFavouriteProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/favourites");
      const favourites = response.data.user.favourites;
      const filteredFavourites = favourites.filter((fav) => fav._id !== null);
      setFavourites(filteredFavourites);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavouriteProducts();
  }, []);

  const handleRemoveFavourite = async (id) => {
    setLoading(true);
    try {
      await api.delete(`remove-favourite/favourite/${id}`);
      setFavourites((prev) => prev.filter((fav) => fav._id !== id));
      setAction("remove-favourite");
      setShowAnimation(true);
      setTimeout(() => {
        setAction(null);
        setShowAnimation(false);
        redirect("/favourites");
      }, 2010);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatePresence>
        {showAnimation && action && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <LottieFeedback type={action} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="grid flex-grow grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {favourites.map((favourite) => (
          <motion.div
            key={favourite._id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white shadow-md rounded-xl"
          >
            <div className="h-48 overflow-hidden bg-gray-100">
              <img
                src={`${import.meta.env.VITE_API_URL}${favourite.productImage}`}
                alt={favourite.productName}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <h2 className="mb-1 text-xl font-semibold text-gray-800">
                {favourite.productName}
              </h2>
              <p className="mb-2 text-gray-600">
                {favourite.productDescription}
              </p>
              <p className="text-lg font-bold text-blue-600">
                ${favourite.productPrice}
              </p>
              <motion.button
                onClick={() => handleRemoveFavourite(favourite._id)}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 mt-4 text-white transition bg-red-500 rounded button hover:bg-red-600"
              >
                Remove from Favourites
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </div>
  );
}

export default Favourites;
