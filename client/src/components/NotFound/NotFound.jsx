import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="text-center-padded error-message">404 - Page Not Found</h1>
      <p className="text-center-padded">
        Go back <Link to="/dashboard">home</Link>
      </p>
    </>
  );
};

export default NotFound;
