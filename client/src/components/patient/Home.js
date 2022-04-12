import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import "./Home.css";

export default function Home(props) {
  let navigate = useNavigate();
  const [usercards, setusercards] = useState([]);
  const [totalcards, settotalcards] = useState([]);
  const [filterCard, setFilter] = useState({
    location: "",
    specialization: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("/homedoctor");
    }
    getAllUsers();
    // eslint-disable-next-line
  }, []);
  async function getAllUsers() {
    const response = await fetch(`http://localhost:5000/api/auth/getAllusers`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setusercards(data);
    settotalcards(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = totalcards.filter((card) => {
      if (filterCard.specialization && filterCard.location) {
        return (
          card.specialization === filterCard.specialization &&
          card.location === filterCard.location &&
          card.role === "doctor"
        );
      } else if (filterCard.location) {
        console.log('here');
        return card.location === filterCard.location && card.role === "doctor";
      } else if (filterCard.specialization) {
        return (
          card.specialization === filterCard.specialization &&
          card.role === "doctor"
        );
      } else {
        return card.role === "doctor";
      }
    });
    setusercards(res);
  }
  const onChange = (e) => {
    setFilter({ ...filterCard, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="">
        <h1>Discover Top Doctors</h1>
        <form onSubmit={handleSubmit}>
          <div className=" mt-3">
            <div className="">
              <div className="row">
                <h5>Filter By Location and Specialization</h5>
                <div className="col-3">
                  <select
                    className="form-select"
                    name="specialization"
                    onChange={onChange}
                    aria-label="Default select example"
                  >
                    <option defaultValue="">
                      Select Specialization
                    </option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>
                <div className="col-3">
                  <select
                    className="form-select"
                    name="location"
                    onChange={onChange}
                    aria-label="Default select example"
                  >
                    <option defaultValue=''>
                      Select Location
                    </option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Bangalore">Banagalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div className="col-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {
          <div className="col-12 mt-3">
            <div className="row ">
              {usercards.map((usercards, index) => (
                <div className="col-xl-3 col-md-6 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 d-flex my-3 d-flex justify-content-center">
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      width="500"
                      height="300"
                      src={usercards.img}
                      className="card-img-top"
                      alt={usercards.name}
                    />
                    <div className="card-body">
                      <h4>Dr. {usercards.name}</h4>
                      <p
                        className="card-text"
                        style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                      >
                        <b>{usercards.specialization}</b> at{" "}
                        {usercards.hospital}
                      </p>
                      <p
                        className="card-text"
                        style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                      >
                        <b>Location :</b> {usercards.location}
                      </p>
                      <p className="card-text" style={{ fontSize: "14px" }}>
                        <b>Years of experience : </b> {usercards.experience}
                      </p>
                      <Link
                        to={`/viewProfile/${usercards._id}`}
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
