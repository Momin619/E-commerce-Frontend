import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/User";
import ValidationErrors from "../validation-component/ValidationErrors";
import Loading from "../loading-component/Loading";
import SuccessMessage from "../ui/SuccessMessage";

function Login() {
  const { setUser, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await api.post("/login", formData);
      const user = response.data.user;
      setUser(user);
      setIsLoggedIn(response.data.isLoggedIn);
      const { redirectTo } = response.data;
      setSuccessMessageText("Login Successful");
      setTimeout(() => {
        navigate(redirectTo);
      }, 3100);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Unexpected error occurred!"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl block mb-24">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Login
            </h2>

            <ValidationErrors errors={errors} />

            <form
              action="/login"
              method="POST"
              className="space-y-5"
              onSubmit={handleOnSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={handleOnChange}
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={handleOnChange}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  required
                  className="mt-1 w-full p-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[69%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Login
              </button>
            </form>

            {/* Success Message (conditionally visible but doesn't affect layout size) */}
            {successMessageText && (
              <div className="mt-4">
                <SuccessMessage
                  message={successMessageText}
                  onClose={() => setSuccessMessageText("")}
                  duration={3000}
                ></SuccessMessage>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
