import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "../patient/Home.css";

export default function Homedoctor(props) {
  let navigate = useNavigate();
  const [usercards, setusercards] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "patient") {
      navigate("*");
    }
    getAllUsers();
    // eslint-disable-next-line
  }, []);
  async function getAllUsers() {
    const response = await fetch(`http://localhost:5000/api/auth/getUser`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    setusercards(data);
  }

  return (
    <div>
      <div className="container">
        <h1>Discover Your Enrolled Patients</h1>
        {
          <div className="col-12 mt-3">
            <div className="row">
              {usercards.enrolledPatient &&
                usercards.enrolledPatient.map((usercard, index) => (
                  <div className="col-xl-3 col-md-6 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 my-3 d-flex justify-content-center">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        width="500"
                        height="300"
                        src={usercard.patientImage}
                        className="card-img-top"
                        alt={usercard.patientName}
                      />
                      <div className="card-body">
                        <h4>{usercard.patientName}</h4>
                        <p
                          className="card-text"
                          style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                        >
                          <b>Email :</b> {usercard.patientEmail}
                        </p>
                        <p
                          className="card-text"
                          style={{ fontSize: "14px", marginBottom: "1rem" }}
                        >
                          <b>Enrolled Date :</b>{" "}
                          {usercard.patientDate.substring(0, 10)}
                        </p>
                        <Link
                          to={`/viewProfilePatient/${usercard.patientId}`}
                          className="btn btn-primary"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
