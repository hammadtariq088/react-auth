import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";

const Auth = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    // console.log(email);

    if (email === null) {
      navigate("/");
    } else {
      setIsLogin(true);
    }
  }, []);

  return <>{isLogin ? children : navigate("/")}</>;
};

export default Auth;
