import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import Loading from "../loading-component/Loading";
import LottieFeedback from "../animation-component/LottieFeedback";
import { useNavigate } from "react-router-dom";
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
      // console.log("Response is ", response);
      // setFavourites);
      const favourites = response.data.user.favourites;
      // if(favourites)
      const filteredFavourites = favourites.filter((fav) => fav._id !== null);
      console.log(filteredFavourites);
      setFavourites(favourites);
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
    <>
      {showAnimation && action && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type={action} />
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
        {favourites.map((favourite) => (
          <div
            key={favourite._id}
            className="overflow-hidden transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden bg-gray-100">
              <img
                src={`https://e-commerce-backend-production-abe1.up.railway.app${
                  favourite.productImage?.startsWith("/") ? "" : "/"
                }${favourite.productImage}`}
                alt={favourite.productName}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>

            {/* Details */}
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
              <button
                onClick={() => handleRemoveFavourite(favourite._id)}
                className="px-4 py-2 mt-4 text-white transition bg-red-500 rounded cursor-pointer hover:bg-red-600"
              >
                Remove from Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Favourites;
