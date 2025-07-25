import api from "../../api/api";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ValidationErrors from "../validation-component/ValidationErrors";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";
import SuccessMessage from "../ui/SuccessMessage";
function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(null);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSumbit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      await api.post("/signup", formData);
      setSuccessMessageText("Signup Successfull");
      setTimeout(() => {
        navigate("/login"); // redirect after showing message
      }, 3100);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Unexpeceted error occured !"]);
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
        <>
          <SuccessMessage
            message={successMessageText}
            onClose={() => setSuccessMessageText("")}
            duration={3000}
          ></SuccessMessage>
          <ValidationErrors errors={errors}></ValidationErrors>

          <div
            className="bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl shadow-xl border mx-auto my-6
                w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
              Create Account
            </h2>

            <form
              action="/signup"
              method="POST"
              className="space-y-4 sm:space-y-5"
              onSubmit={handleOnSumbit}
            >
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  First Name
                </label>
                <input
                  onChange={handleOnChange}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  onChange={handleOnChange}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
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
                  value={formData.email}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
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
                  className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[69%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  onChange={handleOnChange}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  required
                  className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[69%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {/* User Type */}
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-semibold text-gray-700"
                >
                  User Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  required
                  value={formData.userType}
                  onChange={handleOnChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select user type</option>
                  <option value="user">User</option>
                  <option value="host">Host</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Sign Up
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
