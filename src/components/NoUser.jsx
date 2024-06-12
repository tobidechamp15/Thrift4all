import React from "react";
import { Link } from "react-router-dom";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoUser = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">
        Please Log In
        <FontAwesomeIcon
          icon={faCircleExclamation}
          bounce
          className="text-red-400 ms-1"
        />
      </h1>
      <p className="text-gray-600 mb-4">
        To access your content, please log in with your account.
      </p>
      <Link
        to="/login"
        className="btn btn-outline-primary fo py-2 px-4 rounded"
      >
        Log In
      </Link>
    </div>
  );
};

export default NoUser;
