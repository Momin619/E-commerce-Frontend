import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../store/User";
import ValidationErrors from "../validation-component/ValidationErrors";
import Loading from "../loading-component/Loading";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import LottieFeedback from "../animation-component/LottieFeedback";
function Login() {
  const { setUser, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
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
      setAction("signup");
      setShowAnimation(true);
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

  if (loading) return <Loading />;
  return (
    <>
      {showAnimation && action && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type={action} />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-gray-200"
      >
        <div className="block w-full max-w-md p-6 mb-24 bg-white shadow-xl sm:p-8 md:p-10 rounded-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 sm:text-4xl">
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
                  className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            <Button type="submit" className="btn-fancy">
              Login
            </Button>

            <p className="mt-2 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
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
