import api from "../../api/api";
import { useState, useEffect } from "react";

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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-3xl font-bold">
          {profile.firstName?.[0]}
          {profile.lastName?.[0]}
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-gray-500 capitalize">{profile.userType}</p>
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>User ID:</strong> {profile._id}
          </p>
        </div>
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
