import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from 'react-router-dom';
import $ from "jquery";


export const SignUp = () => {

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
                        <h5 className="">Dashtrans Admin</h5>
                        <p className="mb-0">Please fill the below details to create your account</p>
                      </div>
                      <div className="form-body">
                        <form className="row g-3">
                          <div className="col-12">
                            <label for="inputUsername" className="form-label">Username</label>
                            <input type="email" className="form-control" id="inputUsername" placeholder="Jhon" />
                          </div>
                          <div className="col-12">
                            <label for="inputEmailAddress" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="inputEmailAddress" placeholder="example@user.com" />
                          </div>
                          <div className="col-12">
                            <label for="inputChoosePassword" className="form-label">Password</label>
                            <div className="input-group" id="show_hide_password">
                              <input type="password" className="form-control border-end-0" id="inputChoosePassword" value="12345678" placeholder="Enter Password" /> <a href="javascript:;" className="input-group-text bg-transparent"><i className='bx bx-hide'></i></a>
                            </div>
                          </div>
                          <div className="col-12">
                            <label for="inputSelectCountry" className="form-label">Country</label>
                            <select className="form-select" id="inputSelectCountry" aria-label="Default select example">
                              <option selected>India</option>
                              <option value="1">United Kingdom</option>
                              <option value="2">America</option>
                              <option value="3">Dubai</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                              <label className="form-check-label" for="flexSwitchCheckChecked">I read and agree to Terms & Conditions</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button type="submit" className="btn btn-light">Sign up</button>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="text-center ">
                              <p className="mb-0">Already have an account? <a href="auth-cover-signin.html">Sign in here</a></p>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="login-separater text-center mb-5"> <span>OR SIGN UP WITH EMAIL</span>
                        <hr />
                      </div>
                      <div className="list-inline contacts-social text-center">
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3"><i className="bx bxl-facebook"></i></a>
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3"><i className="bx bxl-twitter"></i></a>
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3"><i className="bx bxl-google"></i></a>
                        <a href="javascript:;" className="list-inline-item bg-light text-white border-0 rounded-3"><i className="bx bxl-linkedin"></i></a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/*end row*/}
          </div>
        </div>
      </div>
      {/*end wrapper*/}

    </div>
  );
};

export default SignUp;

