import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthContext } from "../../Context/AuthContext";

const Auth = ({ authRoute }) => {
  let Navigate = useNavigate();

  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const [body, setBody] = useState();

  useEffect(() => {
    if (authLoading) {
      setBody(
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation="border" variant="info" />
        </div>
      );
    } else if (isAuthenticated) return Navigate("/");
    else
      setBody(
        <>
          {authRoute === "login" && <LoginForm />}
          {authRoute === "register" && <RegisterForm />}
        </>
      );
  }, [authLoading, isAuthenticated, authRoute, Navigate]);

  return (
    <div className="landing" style={{ display: "flex", width: "30%" }}>
      <div className="dark-overlay" style={{ width: "100%" }}>
        <div className="landing-inner">{body}</div>
      </div>
    </div>
  );
};

export default Auth;
