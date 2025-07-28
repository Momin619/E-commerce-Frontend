import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
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
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setSuccess(true);
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

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 transition-all duration-300">
        <Lottie animationData={successAnimation} className="w-72 h-72" />
        <h2 className="text-2xl font-semibold text-green-700 mt-4">
          Account Created Successfully!
        </h2>
        <Link to="/login" className="mt-4 text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className=""
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 px-4 sm:px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl space-y-5 transition-all duration-300"
        >
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-4">
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
              className="rounded-xl w-full"
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
              className="rounded-xl w-full"
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
              className="rounded-xl w-full"
            />
          </div>

          {/* Password */}
          <div className="space-y-1 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded-xl pr-10 w-full"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-xl pr-10 w-full"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
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
              className="rounded-xl w-full"
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

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
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
