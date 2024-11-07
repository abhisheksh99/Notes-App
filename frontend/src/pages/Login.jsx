import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../utils/helper";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInFailure, signInStart, signInSuccess } from "../store/userSlice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

    try {
      dispatch(signInStart());
      const res = await axios.post("http://localhost:3000/api/user/signin", {
        email,
        password
      }, {
        withCredentials: true
      });

      if (res.data.success === false) {
        console.log(res.data);
        dispatch(signInFailure(res.data.message));
        return;
      }
      
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10 shadow-md">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7 font-semibold">Login</h4>

          <div className="flex items-center bg-transparent border border-gray-300 rounded px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full text-sm bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="text-gray-400 ml-2" size={22} />
          </div>

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

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button
            type="submit"
            className="btn-primary w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            LOGIN
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 underline hover:text-blue-600"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
