import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useUser } from "../../store/User";
import api from "../../api/api";
import ValidationErrors from "../validation-component/ValidationErrors";
import Loading from "../loading-component/Loading";
import LottieFeedback from "../animation-component/LottieFeedback";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function Login() {
  const { setUser, setIsLoggedIn } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", formData);
      const user = response.data.user;
      setUser(user);
      setIsLoggedIn(response.data.isLoggedIn);
      setShowAnimation(true);
      setLoading(false);

      setTimeout(() => {
        navigate(response.data.redirectTo);
      }, 1500);
    } catch (error) {
      setLoading(false);
      setShowAnimation(false);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type="login" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-gray-200"
      >
        <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Login
          </h2>

          <ValidationErrors errors={errors} />

          <form className="space-y-5" onSubmit={handleOnSubmit}>
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleOnChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleOnChange}
                  className="pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute text-gray-500 transform -translate-y-1/2 button top-1/2 right-3"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            {/* Button */}
            <Button type="submit" className="btn-fancy">
              Login
            </Button>

            {/* Link */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default Login;
