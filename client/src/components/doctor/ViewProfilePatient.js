import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default function ViewProfilePatient(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [noteExcercise, setnoteExcercise] = useState("");
  const [activity, setActivity] = useState([]);

  const [excercise, setexcercise] = useState([
    {
      name: "",
      severity: "",
      perActivityTime: "",
      total: "",
      duration: "",
    },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "patient") {
      navigate("*");
    }
    getUser();
    getExercise();
    // eslint-disable-next-line
  }, []);

  // Separate function to get user details
  async function getUser() {
    const response = await fetch(
      `http://localhost:5000/api/auth/getDetailsofPatient/${id}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setProfile(data);
  }

  async function getExercise() {
    const response = await fetch(
      `http://localhost:5000/api/excercise/fetchexercisedoctor/${id}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setActivity(data);
  }

  const handleExcerciseChange = (i, e) => {
    let newExcercise = [...excercise];
    newExcercise[i][e.target.name] = e.target.value;
    setexcercise(newExcercise);
  };

  let addExcerciseFormFields = () => {
    setexcercise([
      ...excercise,
      {
        name: "",
        severity: "",
        perActivityTime: "",
        total: "",
        duration: "",
      },
    ]);
  };

  let removeExcerciseFormFields = (i) => {
    let newExcercise = [...excercise];
    newExcercise.splice(i, 1);
    setexcercise(newExcercise);
  };

  async function handleExcerciseSubmit(event) {
    //event.preventDefault();
    let patientName = profile.name;
    props.showAlert("Excercise Added Succesfully", "success");
    const response = await fetch(
      `http://localhost:5000/api/excercise/addExcercise/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ excercise, noteExcercise, patientName }),
      }
    );
    const data = await response.json();
    console.log(data);
    setexcercise([
      {
        name: "",
        severity: "",
        perActivityTime: "",
        total: "",
        duration: "",
      },
    ]);
    setnoteExcercise("");
    setActivity(data);
  }

  const handleNoteExcerciseChange = (e) => {
    setnoteExcercise(e.target.value);
  };

  const deleteExcercise = async (ExcId) => {
    console.log("in delete");
    props.showAlert("Excercise Deleted Succesfully", "success");
    //call api for deleting excercise
    const response = await fetch(
      `http://localhost:5000/api/excercise/deleteexercise/${ExcId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    // e.target.className = e.target.className + "disabled";
    // setPrescription(data);
    const newActivity = activity.filter((activity) => {
      return activity._id !== ExcId;
    });
    setActivity(newActivity);
  };

  return (
    <>
      <div className="w3-content w3-margin-top" style={{ maxWidth: "1400px" }}>
        <div className="w3-row-padding">
          <div className="w3-third">
            <div className="w3-white w3-text-grey w3-card-4">
              <div className="w3-display-container">
                <img src={profile.img} style={{ width: "100%" }} alt="Avatar" />
              </div>
              <div className="w3-container" style={{ paddingTop: "15px" }}>
                <h2 className="w3-text-grey w3-padding-16">
                  <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>
                  About {profile.name}
                </h2>
                <hr />
                <p>
                  <i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  {profile.location}
                </p>
                <p>
                  <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  {profile.email}
                </p>
                <p>
                  <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  {profile.phone}
                </p>
                <p>
                  <i className="fa fa-chalkboard fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  Disease - {profile.disease}
                </p>
              </div>
            </div>
            <br />
          </div>
          <div></div>
          <div className="w3-twothird">
            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h3 className="w3-text-grey w3-padding-16">
                <i className="fa fa-suitcase fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                AROMS Report for Back pain
              </h3>
              <div>
                {profile.aroms ? (
                  <>
                    <div className=" w3-white w3-margin-bottom">
                      <div className="row">
                        <div>
                          <div className="card-body">
                            <div class="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col" className="text-center">
                                      Activity
                                    </th>
                                    <th scope="col" className="text-center">
                                      Min angle
                                    </th>
                                    <th scope="col" className="text-center">
                                      Max Angle
                                    </th>
                                  </tr>
                                </thead>
                                {profile.aroms.map((activity, index) => (
                                  <>
                                    <tbody>
                                      <tr>
                                        <td className="text-center">
                                          {activity.name}
                                        </td>
                                        <td className="text-center">
                                          {Math.round(activity.min * 1000) /
                                            1000}{" "}
                                          degree
                                        </td>
                                        <td className="text-center">
                                          {Math.round(activity.max * 1000) /
                                            1000}{" "}
                                          degree
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                ))}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h3 className="w3-text-grey w3-padding-16">
                <i className="fa fa-suitcase fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                Excercise assign
              </h3>
              <div>
                <form onSubmit={handleExcerciseSubmit}>
                  {excercise.map((element, index) => (
                    <div key={index}>
                      <div className="mb-1">
                        <select
                          className="form-select mt-3"
                          name="name"
                          value={excercise.name}
                          onChange={(e) => handleExcerciseChange(index, e)}
                          aria-label="Default select example"
                          required
                        >
                          <option defaultValue="">
                            Select Exercise To Assign
                          </option>
                          <option value="lateral flexion">
                            Lateral Flexion
                          </option>
                          <option value="elbow eccentric">Squats</option>
                          <option value="lunges">Lunges</option>
                          <option value="extension">Extension</option>
                        </select>
                      </div>
                      <div className="w3-half mt-1">
                        <div className="mb-1">
                          <select
                            className="form-select"
                            name="severity"
                            value={excercise.severity}
                            onChange={(e) => handleExcerciseChange(index, e)}
                            aria-label="Default select example"
                            required
                          >
                            <option defaultValue="">Select Severity</option>
                            <option value="high">Severe patient</option>
                            <option value="low">Mild patient</option>
                          </select>
                        </div>
                      </div>

                      <div className="w3-half mt-1">
                        <div className="mb-1">
                          <input
                            type="number"
                            className="form-control "
                            placeholder="Per activity time in secs"
                            name="perActivityTime"
                            value={excercise.perActivityTime}
                            onChange={(e) => handleExcerciseChange(index, e)}
                            required
                          />
                        </div>
                      </div>

                      <div className="w3-half mt-1 ">
                        <div className="mb-1  ">
                          <input
                            type="number"
                            className="form-control "
                            placeholder="Number of times to be done"
                            name="total"
                            value={excercise.total}
                            onChange={(e) => handleExcerciseChange(index, e)}
                            required
                          />
                        </div>
                      </div>
                      <div className="w3-half mt-1">
                        <div className="mb-1">
                          <input
                            type="number"
                            className="form-control "
                            placeholder="Type duration in days"
                            name="duration"
                            value={excercise.duration}
                            onChange={(e) => handleExcerciseChange(index, e)}
                            required
                            minLength={1}
                          />
                        </div>
                      </div>
                      {index ? (
                        <button
                          type="button"
                          className="btn btn-danger mx-4 mt-1"
                          onClick={() => removeExcerciseFormFields(index)}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  ))}

                  <input
                    type="text"
                    className="form-control mb-2 py-3 mt-3"
                    placeholder="Type any specific instructions for the patient"
                    name="noteExcercise"
                    value={noteExcercise}
                    onChange={(e) => handleNoteExcerciseChange(e)}
                  />
                  <div className="w3-half align-items-end">
                    <button
                      type="button"
                      className="btn btn-dark mb-3 px-4"
                      onClick={addExcerciseFormFields}
                    >
                      Add More Fields
                    </button>
                  </div>
                  <div className="w3-half ">
                    <button type="submit" className="btn btn-success mb-3 px-4">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="w3-card w3-white">
              <h3 className="w3-text-grey mx-3" style={{ paddingTop: "20px" }}>
                <i className="fa fa-certificate fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                Activity assigned by you
              </h3>
              <div>
                <h4 className="mt-2">
                  {activity.length === 0 && "No Acitvities Assigned Yet"}
                </h4>
                {activity.map((activity, index) => (
                  <div className="w3-full">
                    <div className="w3-container w3-white w3-margin-bottom">
                      <div
                        className="row"
                        style={
                          activity.completed
                            ? { backgroundColor: "rgb(255 248 248)" }
                            : { backgroundColor: "white" }
                        }
                      >
                        <div key={index} className="">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-8">
                                <h4>
                                  Course Assigned
                                  {activity.completed ? " - completed" : ""}
                                </h4>
                              </div>
                              <div className="col-4">
                                <button
                                  className="btn btn-sm btn-danger btn-block"
                                  onClick={() => {
                                    deleteExcercise(activity._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Exercise Name</th>
                                    <th scope="col">Severity</th>
                                    <th scope="col">Per Activity Time</th>
                                    <th scope="col">Total Times</th>
                                    <th scope="col">Duration</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {activity.excercises.map(
                                    (activity, index) => (
                                      <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{activity.name}</td>
                                        <td>{activity.severity}</td>
                                        <td>
                                          {activity.perActivityTime} seconds
                                        </td>
                                        <td>{activity.total} </td>
                                        <td>{activity.duration} days </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <h6>
                                <b>Starting Date: </b>
                                {activity.startDate}
                              </h6>
                            </div>
                            {activity.note ? (
                              <>
                                <b className="d-block">Special Instruction</b>
                                {activity.note}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
