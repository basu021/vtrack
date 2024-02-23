import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import $ from "jquery";
import axios from 'axios'; // axios for API calls
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Theme from '../../utils/Theme';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");


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

    const passwordInput = document.getElementById("inputChoosePassword");
    const passwordIcon = document.querySelector("#show_hide_password i");

    passwordIcon.addEventListener("click", handlePasswordToggle);

    return () => {
      passwordIcon.removeEventListener("click", handlePasswordToggle);
    };
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        login_id: loginId,
        password: password,
        email: email,
        role_id: selectedRoleId,
      });

      console.log("email in signup is ....................", email);

      if (response.status === 201) {
        // Signup successful
        console.log('Signup successful:', response.data.message);
        // You may redirect the user or show a success message
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        // Signup failed
        console.error('Signup failed:', response.data.message);
        // Handle the error or display an error message
        setError(response.data.message || "Signup failed. Please check your details"); // Set the error message
        toast.error(response.data.message, {
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
      console.error('API error:', error);

      // Check if error.response exists and if data.message is available
      const errorMessage = error.response && error.response.data ? error.response.data.message : "Unknown error";

      // Handle the error or display an error message
      setError("Internal server error: " + errorMessage); // Set the error message
      toast.warn(errorMessage, {
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
  };

  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(2); // Set a default value with the corresponding role_id

  useEffect(() => {
    // Make API call to get roles when the component mounts
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/getroles');
        setRoles(response.data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []); // Empty dependency array to run the effect only once when the component mounts




  return (
    <div className="bg-theme bg-theme1">
      {/*wrapper*/}
      <div className="wrapper">
        <div className="section-authentication-cover">
          <div className="">
            <div className="row g-0">
              <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
                <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                  <div className="card-body">
                    <img src="assets/images/login-images/register-cover.svg" className="img-fluid auth-img-cover-login" width="550" alt="" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right bg-light align-items-center justify-content-center">
                <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0">
                  <div className="card-body p-sm-5">
                    <div className="">
                      <div className="mb-3 text-center">
                        <img src="assets/images/logo-icon.png" width="60" alt="" />
                      </div>
                      <div className="text-center mb-4">
                        <h5 className="">Travel Desk</h5>
                        <ToastContainer />
                        <p className="mb-0">
                          Please fill the below details to create your account
                        </p>
                      </div>
                      <div className="form-body">
                        <form className="row g-3" onSubmit={handleSignup}>
                          <div className="col-12">
                            <label for="inputUsername" className="form-label">
                              Login ID
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputUsername"
                              placeholder="John"
                              value={loginId}
                              onChange={(e) => setLoginId(e.target.value)}
                            />
                          </div>
                          <div className="col-12">
                            <label for="inputEmailAddress" className="form-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmailAddress"
                              placeholder="example@user.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)} />
                          </div>
                          <div className="col-12">
                            <label for="inputChoosePassword" className="form-label">
                              Password
                            </label>
                            <div className="input-group" id="show_hide_password">
                              <input type={showPassword ? 'text' : 'password'}
                                className="form-control border-end-0"
                                id="inputChoosePassword"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password" />{" "}
                              <a href="javascript:;" className="input-group-text bg-transparent">
                                <i className="bx bx-hide"></i>
                              </a>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="userType" className="form-label">
                              Register As
                            </label>
                            {/* What to do should i show role id or just role name to secure */}
                            <select
                              className="form-select"
                              id="userType"
                              aria-label="Default select example"
                              value={selectedRoleId}
                              onChange={(e) => setSelectedRoleId(e.target.value)}
                            >
                              {roles.map((role) => (
                                <option key={role.role_id} value={role.role_id}>
                                  {role.role_name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-12">
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                              <label className="form-check-label" for="flexSwitchCheckChecked">
                                I read and agree to Terms & Conditions
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button type="submit"
                                className="btn btn-light">
                                Sign up
                              </button>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="text-center ">
                              <p className="mb-0">
                                Already have an account?{" "}
                                <a href="/login">
                                  Sign in here
                                </a>
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="login-separater text-center mb-5">
                        {" "}
                        <span>OR SIGN UP WITH EMAIL</span>
                        <hr />
                      </div>
                      <div className="list-inline contacts-social text-center">
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3">
                          <i className="bx bxl-facebook"></i>
                        </a>
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3">
                          <i className="bx bxl-twitter"></i>
                        </a>
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3">
                          <i className="bx bxl-google"></i>
                        </a>
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3">
                          <i className="bx bxl-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/} </div>
        </div>
      </div>
      <Theme/>
      {/*end wrapper*/} </div>
  );
};

export default SignUp;
