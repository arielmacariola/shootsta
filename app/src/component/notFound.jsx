import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div class="container">
      <h2 className="page-title">Page not found.</h2>
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
