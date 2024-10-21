import React, { useState } from "react";
import { Link } from "react-router-dom";
import backIconWhite from "../assets/backIconwhite.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = getAuth(app);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      localStorage.setItem("userId", user.uid);
      console.log(user);
      navigate("/products");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full">
      <div className="h-screen hidden md:w-1/3 md:flex p-3 justify-between items-center bg-black flex-col text-white">
        <div className="flex  items-start w-full">
          <Link to="/">
            <img
              src={backIconWhite}
              className="w-[38px] cursor-pointer"
              alt="Back"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="logoStyle text-6xl">
            Thrift4all
          </Link>
          <span className="my-5 text-2xl">CONTINUE WITH US</span>
        </div>

        <div>
          Do not have an account yet?
          <Link to="/signup" className="text-blue-400">
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[54px] w-2/3 items-center justify-evenly xsm:h-screen xsm:w-full">
        <div className="flex md:hidden flex-col items-center justify-center ">
          <Link to="/" className="logoStyle text-6xl">
            Thrift4all
          </Link>
        </div>
        <span className="text-3xl w-2/3 md:text-start text-center font-semibold">
          Welcome Back
        </span>

        {error && <div className="text-red-500">{error}</div>}

        <form
          className="w-[70%] flex justify-center items-center flex-col gap-[24px] "
          onSubmit={handleSubmit}
        >
          <div className="inputGroup flex items-center justify-center">
            <input
              type="email"
              required
              autoComplete="off"
              className="w-full"
              value={email}
              onChange={handleEmail}
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="inputGroup flex items-center justify-center">
            <input
              type="password"
              required
              autoComplete="off"
              className="w-full"
              value={password}
              onChange={handlePassword}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-success py-2 px-6 font-semibold text-lg rounded-[60px]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="mt-[50px] flex md:hidden">
          Do not have an account yet?
          <Link to="/signup" className="text-blue-400">
            {""} Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
