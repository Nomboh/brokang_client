import "./login.css";
import React, { useRef, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { loginCall } from "../../context/apiCalls";
import { useAuth } from "../../context/auth/AuthContext";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { dispatch, user, loading, error } = useAuth();

  const handleLogin = e => {
    e.preventDefault();
    loginCall(
      { email: emailRef.current?.value, password: passwordRef.current?.value },
      dispatch
    );
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast(error?.message, {
        type: "error",
        position: "top-center",
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  }, [error]);

  return (
    <div className="container">
      <div className="login">
        <ToastContainer />
        <div className="login_wrapper">
          <h2 className="login_title">
            Login to interact with people and products
          </h2>
          <form onSubmit={handleLogin} className="login_form">
            <input
              placeholder="enter your email address"
              type={"email"}
              className="login_input"
              ref={emailRef}
            />
            <input
              placeholder="enter your password"
              type={"password"}
              className="login_input"
              ref={passwordRef}
            />

            <button type="submit" disabled={loading} className="login_btn">
              {loading ? (
                <CircularProgress size={"16px"} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <span className="login_text">forgot your password?</span>
          <div className="login_regis">
            dont have an account yet?{" "}
            <span className="login_text">click here</span>{" "}
          </div>

          <div className="social_logins">
            <button className="login_fb">
              <FacebookIcon /> Login With Facebook
            </button>
            <button className="login_gl">
              {" "}
              <GoogleIcon /> Login With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
