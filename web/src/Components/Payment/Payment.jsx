import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="mt-4">
      <h1>Order Successfully!</h1>
      <div>
        <Link className="btn btn-info" to={"/"}>
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Payment;
