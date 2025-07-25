import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/User";
function Error() {
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();
  const redirectTo = user.userType === "user" ? "/products" : "/host/products";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-700">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500 text-sm md:text-base max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate(redirectTo)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg transition"
      >
        {user?.userType === "host" ? "Go to Host Products" : "Go to Products"}
      </button>
    </div>
  );
}

export default Error;
