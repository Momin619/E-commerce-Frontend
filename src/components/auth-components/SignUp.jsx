import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LottieFeedback from "../animation-component/LottieFeedback";
import ValidationErrors from "../validation-component/ValidationErrors";
import Loading from "../loading-component/Loading";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectItem } from "../ui/select";
import { Label } from "../ui/label";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [action, setAction] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/signup", formData);
      setAction("signup");
      setShowAnimation(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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

  if (loading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className=""
    >
      {showAnimation && action && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LottieFeedback type={action} />
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 space-y-5 transition-all duration-300 bg-white shadow-2xl sm:max-w-lg sm:p-8 md:p-10 rounded-3xl"
        >
          <h2 className="mb-4 text-2xl text-center text-gray-800 sm:text-3xl lg:text-4xl">
            Create an Account
          </h2>

          {errors.length > 0 && <ValidationErrors errors={errors} />}

          {/* First Name */}
          <div className="space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-xl"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-xl"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="relative space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pr-10 rounded-xl"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 button"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pr-10 rounded-xl"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 button"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* User Type */}
          <div className="space-y-1">
            <Label htmlFor="userType">User Type</Label>
            <Select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full rounded-xl"
            >
              <SelectItem value="">Select a type</SelectItem>
              <SelectItem value="host">Host</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </Select>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" className="btn-fancy">
              Sign Up
            </Button>
          </div>

          <p className="mt-3 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

export default SignUp;
