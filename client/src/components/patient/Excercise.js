import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Excercise = (props) => {
  let navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("*");
    }
    getExcercise();
    getUser();
    // eslint-disable-next-line
  }, []);
  async function getExcercise() {
    const response = await fetch(
      `http://localhost:5000/api/excercise/fetchtExcercise`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const excercises = await response.json();
    setActivity(excercises);
  }
  async function getUser() {
    const response = await fetch(`http://localhost:5000/api/auth/getUser`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setProfile(data);
  }
  const leftrightExercise = ["elbow flexsion", "elbow busitis", "tennis elbow"];
  return (
    <div className="container">
      <div className="mx-3 card mt-4">
        {
          <div className="col-12">
            <h2 className="mx-4">Exercise Tracker</h2>
            <div className="row">
              {activity.map((activity, index) => (
                <>
                  {activity.excercises.map((excercise, index) => (
                    <>
                      <div className="card-body">
                        <div className={`alert mx-4 alert-info`} role="alert">
                          <div className="row">
                            <div className="col-7 col-sm-8 justify-content-center align-self-center">
                              <b>Exercise Name: </b>
                              {excercise.name==='elbow eccentric'?'squats':excercise.name} &nbsp; &nbsp;&nbsp;
                              <br></br>
                              <b>Per activity time:</b>{" "}
                              {excercise.perActivityTime} seconds &nbsp;
                              &nbsp;&nbsp;
                              <br></br>
                              <b>Total time to do: </b>
                              {excercise.total}
                            </div>

                            <div className="col-5 col-sm-3">
                              {leftrightExercise.includes(excercise.name) ? (
                                <>
                                Select which side is in pain
                                
                                <a
                                type="button"
                                className="btn btn-success mx-2"
                                href={`http://localhost:8000/${excercise.name
                                  .split(" ")
                                  .join("")}/left,${excercise.severity},${excercise.perActivityTime},${profile._id},${excercise._id},${activity._id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                                &nbsp; Left
                              </a>
                              <a
                                type="button"
                                className="btn btn-primary"
                                href={`http://localhost:8000/${excercise.name
                                  .split(" ")
                                  .join("")}/right,${excercise.severity},${excercise.perActivityTime},${profile._id},${excercise._id},${activity._id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                
                                Right &nbsp;
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                              </a>
                                </>
                              ) : (
                                <div className="text-center">
                                <a
                                type="button"
                                className="btn btn-success"
                                href={`http://localhost:8000/${excercise.name
                                  .split(" ")
                                  .join("")}/${excercise.severity},${excercise.perActivityTime},${profile._id},${excercise._id},${activity._id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                                &nbsp; Start
                              </a></div>
                              )}
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ))}
              {activity.length === 0 ? (
                <h4 className="px-4 mx-3">No exercises to do</h4>
              ) : (
                <></>
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
};
