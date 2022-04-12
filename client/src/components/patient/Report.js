import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Report = (props) => {
  let navigate = useNavigate();
  const [excerciseList, setexcerciseList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("*");
    }
    getReport();
    // eslint-disable-next-line
  }, []);
  async function getReport() {
    const response = await fetch(
      `http://localhost:5000/api/excercise/fetchtExcercise`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setexcerciseList(data);
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <h2>Post-care Activity Daily Report</h2>

        <h4 className="mt-2">
          {excerciseList.length === 0 && "No Reports Yet"}
        </h4>

        {/* // excerciseList.map((activity, index) =>
    //   activity.excercises.map((excercise, index) => {
    //     if (excercise.report.length !== 0) {
    //       excercise.report.map((reportObj, index) => {
    //         retReport.push(reportObj);
    //       });
    //     }
    //   })
    // ); */}
        {excerciseList.map((activity, index) => (
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
                                    <th scope="col">Date</th>
                                    <th scope="col" className="text-center">
                                      Exercise Name
                                    </th>
                                    <th scope="col" className="text-center">
                                      Intensity
                                    </th>
                                    <th scope="col" className="text-center">
                                      Time Taken
                                    </th>
                                    <th scope="col" className="text-center">
                                      Counter
                                    </th>
                                    <th scope="col" className="text-center">
                                      Activity Rate: Completed / Given
                                    </th>
                                    <th scope="col" className="text-center">
                                      Error
                                    </th>
                                  </tr>
                                </thead>
                                {excercise.report.map((reportObj, index) => (
                                  <>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{reportObj.date}</th>
                                        <td className="text-center">
                                          {excercise.name}
                                        </td>
                                        <td className="text-center">
                                          {excercise.severity}
                                        </td>
                                        <td className="text-center">
                                          {reportObj.timer} seconds
                                        </td>
                                        <td className="text-center">
                                          {reportObj.counter} times
                                        </td>
                                        <td className="text-center">
                                          {" "}
                                          {Math.round(
                                            (reportObj.timer /
                                              reportObj.counter) *
                                              1000
                                          ) / 1000}{" "}
                                          /{excercise.perActivityTime}{" "}
                                        </td>
                                        <td className="text-center">
                                          {reportObj.error}{" "}
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
