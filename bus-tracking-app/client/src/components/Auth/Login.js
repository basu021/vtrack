import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import $ from "jquery";
import Theme from '../../utils/Theme';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handlePasswordToggle = () => {
      const passwordInput = document.getElementById("inputChoosePassword");
      const passwordIcon = document.querySelector("#show_hide_password i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove("bx-hide");
        passwordIcon.classList.add("bx-show");
      } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("bx-show");
        passwordIcon.classList.add("bx-hide");
      }
    };

    const passwordIcon = document.querySelector("#show_hide_password i");

    passwordIcon.addEventListener("click", handlePasswordToggle);

    return () => {
      passwordIcon.removeEventListener("click", handlePasswordToggle);
    };
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // for login Functionality
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null); // Add this line

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: loginId,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, and user has a role
        const { user } = data;
        const { id, email, role_id } = user;

        // Store user information in state, context, or localStorage as needed
        setUser({ id, email, role_id });

        // Redirect to the landing page or any other page based on your logic
        history.push("/landing");
      } else {
        // Login failed or user does not have a role
        // setError(data.message || "Invalid Details");
        toast.error(data.message || "Invalid Details", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      setError(error.message || "Internal server error client");
    }
  };
  return (
    <div className="bg-theme bg-theme1">
      <div className="wrapper">
        <div className="section-authentication-cover">
          <div className="">
            <div className="row g-0">
              <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
                <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                  <div className="card-body">
                    <img
                      src="assets/images/login-images/login-cover.svg"
                      className="img-fluid auth-img-cover-login"
                      width="650"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right bg-light align-items-center justify-content-center">
                <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0">
                  <div className="card-body p-sm-5">
                    <div className="">
                      <div className="mb-3 text-center">
                        <img
                          src="assets/images/logo-icon.png"
                          width="60"
                          alt=""
                        />
                      </div>
                      <div className="text-center mb-4">
                        <h5 className="">Travel Desk</h5>
                        <p className="mb-0">Please log in to your account</p>
                        <p>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                        </p>
                        <ToastContainer />
                      </div>
                      <div className="form-body">
                        <div className="row g-3">
                          <div className="col-12">
                            <label
                              for="inputEmailAddress"
                              className="form-label"
                            >
                              Email/ Emp. ID/ Phone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputEmailAddress"
                              placeholder="ex@company.com"
                              value={loginId}
                              onChange={(e) => setLoginId(e.target.value)}
                            />
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="inputChoosePassword"
                              className="form-label"
                            >
                              Password
                            </label>
                            <div
                              className="input-group"
                              id="show_hide_password"
                            >
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control border-end-0"
                                id="inputChoosePassword"
                                value={password}
                                onChange={(e) => {
                                  handlePasswordChange(e);
                                  setPassword(e.target.value);
                                }}
                                placeholder="Enter Password"
                              />
                              <a
                                href="javascript:;"
                                className="input-group-text bg-transparent"
                                onClick={handleTogglePassword}
                              >
                                <i
                                  className={
                                    showPassword ? "bx bx-show" : "bx bx-hide"
                                  }
                                ></i>
                              </a>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                              />
                              <label
                                className="form-check-label"
                                for="flexSwitchCheckChecked"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 text-end">
                            {" "}
                            <a href="auth-cover-forgot-password.html">
                              Forgot Password ?
                            </a>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                type="submit"
                                onClick={handleLogin}
                                className="btn btn-light"
                              >
                                Sign in
                              </button>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="text-center">
                              <p className="mb-0">
                                Don't have an account yet?{" "}
                                <a href="/signup">
                                  Sign up here
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="login-separater text-center mb-5">
                        {" "}
                        <span>OR SIGN IN WITH</span>
                        <hr />
                      </div>
                      <div className="list-inline contacts-social text-center">
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-light text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-facebook"></i>
                        </a>
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-light text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-twitter"></i>
                        </a>
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-light text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-google"></i>
                        </a>
                        <a
                          href="javascript:;"
                          className="list-inline-item bg-light text-white border-0 rounded-3"
                        >
                          <i className="bx bxl-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Theme/>
    </div>
  );
};

export default Login;
