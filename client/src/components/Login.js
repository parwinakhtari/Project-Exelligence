import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save tha uth and redirect
      localStorage.setItem("role", json.user.role);
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("email", json.user.email);
      if (localStorage.getItem("role") === "doctor") {
        navigate("/homedoctor");
        props.showAlert("Your OTP is", "success", json.user.otp);
      } else navigate("/");
    }
  };

  return (
    <div className="container">
      <section className="h-100 gradient-form">
        <div className="h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://res.cloudinary.com/rapidhack/image/upload/v1643878114/Medibles-logo_wpyytn.png"
                          style={{ width: "45px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">Project - Exelligence</h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={onChange}
                            value={credentials.email}
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={credentials.password}
                            onChange={onChange}
                            minLength={5}
                            required
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link
                            type="button"
                            className="btn btn-outline-danger"
                            to="/signuphome"
                            role="button"
                          >
                            Create new
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Exelligence Paltform</h4>
                      <p className="small mb-0">
                        Get digital prescriptions, monitoring your progress with
                        advanced AI features, being a part of patients -
                        community. Get personalized one-to-one attentions by
                        health professionals till completely recovery .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
