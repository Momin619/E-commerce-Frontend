import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import successAnimation from "../../assets/success.json";
import { useUser } from "../../store/User";
import ValidationErrors from "../validation-component/ValidationErrors";
import Loading from "../loading-component/Loading";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import Lottie from "lottie-react";
function Login() {
  const { setUser, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

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
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", formData);
      const user = response.data.user;
      setUser(user);
      setIsLoggedIn(response.data.isLoggedIn);
      const { redirectTo } = response.data;
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Unexpected error occurred!"]);
      }
    }
  };
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 transition-all duration-300">
        <Lottie animationData={successAnimation} className="w-72 h-72" />
        <h2 className="text-2xl font-semibold text-green-700 mt-4">
          Login Successful
        </h2>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
        >
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl block mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">
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
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleOnChange}
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  className="mt-1 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    onChange={handleOnChange}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    required
                    className="pr-10 rounded-xl"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              <Button type="submit" className="btn-fancy">
                Login
              </Button>

              <p className="text-sm text-center text-gray-600 mt-2">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Login;
