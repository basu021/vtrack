import React from 'react';

const Login = () => {
  return (
    <div className="wrapper">
      <div className="section-authentication-cover">
        <div className="row g-0">
          <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
            <div className="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
              <div className="card-body">
                <img src="assets/images/login-images/login-cover.svg" className="img-fluid auth-img-cover-login" width="650" alt="" />
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right bg-light align-items-center justify-content-center">
            <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0">
              <div className="card-body p-sm-5">
                <div>
                  <div className="mb-3 text-center">
                    <img src="assets/images/logo-icon.png" width="60" alt="" />
                  </div>
                  <div className="text-center mb-4">
                    <h5 className="">Travel Desk</h5>
                    <p className="mb-0">Please log in to your account</p>
                  </div>
                  <div className="form-body">
                    <form className="row g-3">
                      {/* Your form fields go here */}
                    </form>
                  </div>
                  {/* Additional content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
