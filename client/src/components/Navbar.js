import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const userrole = localStorage.getItem("role");

  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
    props.showAlert("Logged Out!!", "primary");
  };
  return (
    <>
      {!localStorage.getItem("token") ? (
        <></>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <img
              src="https://res.cloudinary.com/rapidhack/image/upload/v1643878114/Medibles-logo_wpyytn.png"
              style={{ width: "32px" }}
              alt="logo"
              className="mx-2"
            />
            <Link
              className="navbar-brand"
              to={userrole === "patient" ? "/" : "/homedoctor"}
            >
              Exelligence
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {userrole === "patient" ? (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/aroms" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/aroms"
                    >
                      AROMS
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/excercise" ? "active" : ""
                      }`}
                      to="/excercise"
                    >
                      Excercise
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/report" ? "active" : ""
                      }`}
                      to="/report"
                    >
                      Report
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/aboutpatient" ? "active" : ""
                      }`}
                      to="/aboutpatient"
                    >
                      About
                    </Link>
                  </li>
                </ul>
                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                  logout
                </button>
              </div>
            ) : (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/homedoctor" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/homedoctor"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/aboutmentee" ? "active" : ""
                      }`}
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/reportDoctor" ? "active" : ""
                      }`}
                      to="/reportDoctor"
                    >
                      Report
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/notify" ? "active" : ""
                      }`}
                      to="/notify"
                    >
                      Notifications
                    </Link>
                  </li>
                </ul>
                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                  logout
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
