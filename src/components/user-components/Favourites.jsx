import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import Loading from "../loading-component/Loading";
function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(null);
  const fetchFavouriteProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/favourites");
      // console.log("Response is ", response);
      // setFavourites);
      const favourites = response.data.user.favourites;
      console.log(favourites);
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
    try {
      await api.delete(`remove-favourite/favourite/${id}`);
      setFavourites((prev) => prev.filter((fav) => fav._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {favourites.map((favourite) => (
          <div
            key={favourite._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            <div className="h-48 bg-gray-100 overflow-hidden">
              <img
                src={`https://e-commerce-backend-production-abe1.up.railway.app${
                  favourite.productImage?.startsWith("/") ? "" : "/"
                }${favourite.productImage}`}
                alt={favourite.productName}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {favourite.productName}
              </h2>
              <p className="text-gray-600 mb-2">
                {favourite.productDescription}
              </p>
              <p className="text-blue-600 font-bold text-lg">
                ${favourite.productPrice}
              </p>
              <button
                onClick={() => handleRemoveFavourite(favourite._id)}
                className="mt-4 px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 transition"
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
