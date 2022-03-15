import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Aroms = () => {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("*");
    }
    getUser();
    // eslint-disable-next-line
  }, []);
  async function getUser() {
    const response = await fetch(
      `https://exelligence-backend.herokuapp.com/api/auth/getUser`,
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
  return (
    <div className="container">
      <div className="row mt-4">
        <h2>Your AROM Records</h2>

        <h4 className="mt-2">
          {profile.aroms.length === 0 &&
            "Not recorded Yet! Record your AROMS for better evalution"}
        </h4>
        <h5>For Back Pain</h5>
        <a
          type="button"
          className="btn btn-success mx-2"
          href={`http://127.0.0.1:8000/aroms/flexion${profile._id}`}
          target="_blank"
          rel="noreferrer"
        >
          Record Aroms for flexion
        </a>
        <a
          type="button"
          className="btn btn-success mx-2"
          href={`http://127.0.0.1:8000/aroms/extension,${profile._id}`}
          target="_blank"
          rel="noreferrer"
        >
          Record Aroms for extension
        </a>
        <a
          type="button"
          className="btn btn-success mx-2"
          href={`http://127.0.0.1:8000/aroms/lateralflexion${profile._id}`}
          target="_blank"
          rel="noreferrer"
        >
          Record Aroms for Lateral flexion
        </a>

        {/* // excerciseList.map((activity, index) =>
    //   activity.excercises.map((excercise, index) => {
    //     if (excercise.report.length !== 0) {
    //       excercise.report.map((reportObj, index) => {
    //         retReport.push(reportObj);
    //       });
    //     }
    //   })
    // ); */}
        {profile.aroms.map((activity, index) => (
          <>
            {activity.excercises.map((excercise, index) => (
              <>
                {excercise.report.length !== 0 ? (
                  <>
                    <div className="w3-container w3-card w3-white w3-margin-bottom">
                      <div className="row">
                        <div key={index} className="w3-container">
                          <div className="card-body">
                            {/* <div className="row">
                                    <div className="col-8">
                                      <h4>Activity by {excercise.doctorName}</h4>{" "}
                                    </div>
                                  </div> */}

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
                                {excercise.report.map((reportObj, index) => (
                                  <>
                                    <tbody>
                                      <tr>
                                        <td className="text-center">
                                          {excercise.name}
                                        </td>
                                        <td className="text-center">
                                          {excercise.severity}
                                        </td>
                                        <td className="text-center">
                                          {excercise.severity}
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
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};
