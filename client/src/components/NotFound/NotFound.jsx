import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="text-center mt-5 text-danger">404 - Page Not Found</h1>
      <p className="text-center m-1">
        Go back <Link to="/">home</Link>
      </p>
    </>
  );
};

export default NotFound;
