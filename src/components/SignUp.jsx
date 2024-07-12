import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { app, db } from "./firebase/config";
// import { doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import backIconWhite from "../assets/backIconwhite.svg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@run\.edu\.ng$/;

    if (emailPattern.test(inputEmail)) {
      setEmail(inputEmail);
      setErrorEmail("");
    } else {
      setEmail(inputEmail);
      setErrorEmail("Email must be in the format @run.edu.ng");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let auth = getAuth(app);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(response.user);
      createUserProfile(response.user, username, name);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (user, username, name) => {
    const userDocRef = doc(db, "users", user.uid);
    const userProfileData = {
      username: username,
      email: user.email,
      verificationStatus: user.emailVerified,
      name: name,
    };
    try {
      await setDoc(userDocRef, userProfileData);
    } catch (error) {
      console.error("Error Creating user Profile", error);
    }
  };

  return (
    <div className="relative flex w-full">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <div className="loader border-4 border-t-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className="h-screen md:w-1/3 md:flex p-3 justify-between items-center bg-black flex-col text-white hidden w-full">
        <div className="flex items-start w-full">
          <Link to="/">
            <img src={backIconWhite} className="w-[38px] cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="logoStyle text-6xl">
            Thrift4all
          </Link>
          <span className="my-5 text-2xl text-center">LET GET YOU STARTED</span>
        </div>
        <div className="text-center flex flex-wrap gap-2 items-center justify-center">
          Already have an account?
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:w-2/3 items-center justify-center w-full">
        <span className="text-2xl font-medium md:w-2/3 text-start">
          Create an Account
        </span>

        {error && <div className="text-red-500">{error}</div>}

        <form
          className="md:w-[80%] flex justify-center items-center flex-col gap-[24px] w-full p-2"
          onSubmit={handleSubmit}
        >
          <div className="inputGroup flex items-center justify-center">
            <input
              type="text"
              required
              autoComplete="off"
              className="w-full"
              onChange={handleName}
              placeholder=" "
              value={name}
            />
            <label htmlFor="name">Your Name</label>
          </div>
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
            <label htmlFor="name">StudentMail</label>
          </div>
          {errorEmail && (
            <div className="text-red-600 text-start w-full ps-2">
              {errorEmail}
            </div>
          )}
          <div className="inputGroup flex items-center justify-center">
            <input
              type="text"
              required
              autoComplete="off"
              className="w-full"
              value={username}
              onChange={handleUsername}
              placeholder=" "
            />
            <label htmlFor="name">Username</label>
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
            <label htmlFor="name">Password</label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-success py-6 px-10 rounded-[60px]"
              disabled={loading}
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
