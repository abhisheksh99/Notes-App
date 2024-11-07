import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import axios from "axios";
import { validateEmail } from "../utils/helper";
import { signUpStart, signUpSuccess, signUpFailure } from "../store/userSlice/userSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError(""); 
    dispatch(signUpStart());

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signup",
        { username: name, email, password },
        { withCredentials: true }
      );

      console.log("Signup API Response:", res.data);

      if (res.data.success) {
        const { _id, username, email: userEmail } = res.data.user || {}; // Safely destructuring

        // Constructing the userInfo object to match the expected format in ProfileInfo
        const userInfo = {
          user: {
            _id: _id || null,
            username: username || null,
            email: userEmail || null,
          },
          message: res.data.message,
          success: res.data.success,
        };

        console.log("Dispatching to Redux:", userInfo);
        dispatch(signUpSuccess(userInfo));
        navigate("/"); // Redirect to the home page after successful signup
      } else {
        dispatch(signUpFailure(res.data.message));
        setError(res.data.message); // Display error message from server
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
      setError("Failed to sign up. Please try again.");
    }
  };

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10 shadow-md">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7 font-semibold">Sign Up</h4>

          {/* Name Input */}
          <div className="flex items-center bg-transparent border border-gray-300 rounded px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full text-sm bg-transparent outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="text-gray-400 ml-2" size={22} />
          </div>

          {/* Email Input */}
          <div className="flex items-center bg-transparent border border-gray-300 rounded px-3 py-2 mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-sm bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="text-gray-400 ml-2" size={22} />
          </div>

          {/* Password Input with Toggle Visibility */}
          <div className="flex items-center bg-transparent border border-gray-300 rounded px-3 py-2 mb-4">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full text-sm bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? (
              <FaRegEye
                size={22}
                className="text-blue-500 cursor-pointer ml-2"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer ml-2"
                onClick={toggleShowPassword}
              />
            )}
          </div>

          {/* Display error messages */}
          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            SIGN UP
          </button>

          {/* Link to Login page */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 underline hover:text-blue-600"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
