import api from "../../api/api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../ui/Footer";
function Profile() {
  const [profile, setProfile] = useState({});

  const handleProfile = async () => {
    try {
      const response = await api.get("/profile");
      const user = response.data.user;
      setProfile(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className="flex flex-col w-screen gap-4 p-1">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex items-center justify-center w-24 h-24 text-3xl font-bold text-indigo-600 bg-indigo-100 rounded-full"
          >
            {profile.firstName?.[0]}
            {profile.lastName?.[0]}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-2xl font-semibold text-gray-800"
          >
            {profile.firstName} {profile.lastName}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 capitalize"
          >
            {profile.userType}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 space-y-1 text-sm text-gray-600"
          >
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>User ID:</strong> {profile._id}
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 mt-6 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Profile;
