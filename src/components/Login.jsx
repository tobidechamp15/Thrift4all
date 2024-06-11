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
    setError(false);

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
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full">
      <div className="h-screen md:w-1/3 flex p-3 justify-between items-center bg-black flex-col text-white">
        <div className="flex  items-start w-full">
          <Link to="/">
            <img src={backIconWhite} className="w-[38px] cursor-pointer" />
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

      <div className="flex flex-col gap-[24px] w-2/3 items-center justify-center">
        <span className="text-3xl w-2/3 text-start font-semibold">
          Welcome Back
        </span>

        {error && <div className="text-red-500">{error}</div>}

        <form
          className="w-2/3 flex justify-center items-center flex-col gap-[24] "
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
              placeholder=" " // Use a space as a placeholder to trigger the label animation
            />
            <label htmlFor="name">StudentMail</label>
          </div>

          <div className="inputGroup flex items-center justify-center">
            <input
              type="password"
              required
              autoComplete="off"
              className="w-full"
              value={password}
              onChange={handlePassword}
              placeholder=" " // Use a space as a placeholder to trigger the label animation
            />
            <label htmlFor="name">Password</label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-success py-2 px-6 font-semibold text-lg rounded-[60px]"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;