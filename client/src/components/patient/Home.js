import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import ChatBot from "react-simple-chatbot";
import PropTypes from 'prop-types';

import "./Home.css";

export default function Home(props) {
  let navigate = useNavigate();
  const [usercards, setusercards] = useState([]);
  const [totalcards, settotalcards] = useState([]);
  const [filterCard, setFilter] = useState({
    location: "",
    specialization: "",
  });

  const BMI = (props) => {
    const { steps } = props;
    const height = steps.height.value;
    const weight = steps.weight.value;
    const bmi = Number(((weight / (height * height)) * 10000).toFixed(1));
    let result = 'Underweight';

    if (bmi >= 18.5 && bmi < 25) {
      result = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      result = 'Overweight';
    } else if (bmi >= 30) {
      result = 'Obesity';
    }

    return (
      <div className="test">
        Your BMI is {bmi} ({result})
      </div>
    );
  };

  BMI.propTypes = {
    steps: PropTypes.object,
  };

  BMI.defaultProps = {
    steps: undefined,
  };



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
    const response = await fetch(`https://exelligence-backend.herokuapp.com/api/auth/getAllusers`, {
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
      <ChatBot steps={[
        {
          id: '1',
          message: 'Hi! Do you need some help?',
          trigger: '7',
        },
        {
          id: '2',
          message: 'Let\'s calculate your BMI (Body Mass Index)',
          trigger: '3',
        },
        {
          id: '3',
          message: 'Please type your height (cm)',
          trigger: 'height',
        },
        {
          id: 'height',
          user: true,
          trigger: '4',
        },
        {
          id: '4',
          message: 'Please type your weight (kg)',
          trigger: 'weight',
        },
        {
          id: 'weight',
          user: true,
          trigger: '5',
        },
        {
          id: '5',
          message: 'Thanks! Check out your BMI',
          trigger: '6',
        },
        {
          id: '6',
          component: <BMI />,
          end: true,
        },
        {
          id: '7',
          options: [
            { value: 1, label: 'Yes', trigger: '9' },
            { value: 2, label: 'No', trigger: '8' },
          ],
        },
        {
          id: '8',
          message: 'Awesome! Hope you are enjoying Project-Medible',
          end: true,
        },
        {
          id: '9',
          message: 'Great!',
          trigger: '10'
        },
        {
          id: '10',
          message: "Say Hello to India's top doctors via Project Exelligence",
          trigger: '12'
        },
        {
          id: '12',
          message: 'What do you want to know',
          trigger: '13'
        },
        {
          id: '13',
          options: [
            { value: 1, label: 'BMI', trigger: '2' },
            { value: 2, label: 'Exelligence Features', trigger: '14' },
          ],
        },
        {
          id: '14',
          message: 'What do you want to know',
          trigger: '15'
        },
        {
          id: '15',
          options: [
            { value: 1, label: 'Book doctor', trigger: '17' },
            { value: 2, label: 'Excercise Feature', trigger: '16' },
          ],
        },
        {
          id: '16',
          message: 'Go to your excercise tab and all the excercises given to you are shown, Click on the given excercise to perform it and your report will be generated accordingly.',
          trigger: '8'
        },
        {
          id: '17',
          message: 'In your Home Page, You can see all the doctors registered in our platform. If you want to book a doctor, click on their profile and the you can send them a request',
          trigger: '8'
        },
      ]}
        floating={true} />
    </div>
  );
}
