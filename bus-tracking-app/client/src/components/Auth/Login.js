import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import $ from "jquery";
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
  useEffect(() => {
    const themeSwitchers = document.querySelectorAll(".switcher-wrapper li");
    const switcherWrapper = document.querySelector(".switcher-wrapper");

    themeSwitchers.forEach((themeSwitcher) => {
      themeSwitcher.addEventListener("click", () => {
        const themeNumber = themeSwitcher.id.slice(5); // Extract the theme number
        document.body.className = `bg-theme bg-theme${themeNumber}`;
      });
    });

    const toggleSwitcher = document.querySelector(".switcher-btn");
    const closeSwitcher = document.querySelector(".close-switcher");

    toggleSwitcher.addEventListener("click", () => {
      switcherWrapper.classList.toggle("switcher-toggled");
    });

    closeSwitcher.addEventListener("click", () => {
      switcherWrapper.classList.remove("switcher-toggled");
    });
  }, []);

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
      <div className="switcher-wrapper">
        <div className="switcher-btn">
          {" "}
          <i className="bx bx-cog bx-spin"></i>
        </div>
        <div className="switcher-body">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-uppercase">Theme Customizer</h5>
            <button
              type="button"
              className="btn-close ms-auto close-switcher"
              aria-label="Close"
            ></button>
          </div>
          <hr />
          <p className="mb-0">Gaussian Texture</p>
          <hr />

          <ul className="switcher">
            <li id="theme1"></li>
            <li id="theme2"></li>
            <li id="theme3"></li>
            <li id="theme4"></li>
            <li id="theme5"></li>
            <li id="theme6"></li>
          </ul>
          <hr />
          <p className="mb-0">Gradient Background</p>
          <hr />

          <ul className="switcher">
            <li id="theme7"></li>
            <li id="theme8"></li>
            <li id="theme9"></li>
            <li id="theme10"></li>
            <li id="theme11"></li>
            <li id="theme12"></li>
            <li id="theme13"></li>
            <li id="theme14"></li>
            <li id="theme15"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
