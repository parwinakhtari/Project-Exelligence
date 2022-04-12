import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ReportDoctor = (props) => {
  let navigate = useNavigate();
  const [excerciseList, setexcerciseList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "patient") {
      navigate("*");
    }
    otpconf();
    // eslint-disable-next-line
  }, []);
  async function otpconf() {
    const response = await fetch(
      `http://localhost:5000/api/auth/getUser`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data.otp);
    let otpenter = prompt("Type your otp to view patients report");
    while (otpenter !== data.otp) {
      otpenter = prompt("Oops!! wrong otp please try again to view patients report");
    }
    if (otpenter === data.otp) {
      props.showAlert("YAYY!! OTP matched now you can see patients reports", "success");
      getReport();
    }
  }

  async function getReport() {
    console.log("hahahha");
    const response = await fetch(
      `http://localhost:5000/api/excercise/fetchtExcerciseDoctor`,
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
        <h2>Patients Final Activity Report</h2>

        <h4 className="mt-2">
          {excerciseList.length === 0 && "No reports yet"}
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
            <div className="w3-container w3-card w3-white w3-margin-bottom">
              {activity.excercises.map((excercise, index) => (
                <>
                  {excercise.report.length !== 0 ? (
                    <>
                      <div className="row">
                        <div key={index} className="w3-container">
                          <div className="card-body">
                            <h3>
                              Final report of:{" "}
                              <b style={{ fontSize: "18px" }}>
                                {activity.patientName}
                              </b>
                              <Link
                                type="button"
                                className="btn btn-primary btn-sm mx-2"
                                to={`/viewProfilePatient/${activity.patient}`}
                              >
                                View Profile &nbsp;
                                <i className="fas fa-greater-than"></i>
                              </Link>
                            </h3>

                            {/* <div className="row">
                                    <div className="col-8">
                                      <h4>Activity by {excercise.doctorName}</h4>
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
                                      Patient's Time Taken
                                    </th>
                                    {/* <th scope="col" className="text-center">
                                      Activity Rate: Completed / Given
                                    </th> */}
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
                                          {reportObj.timer} seconds
                                        </td>
                                        <td className="text-center">
                                          {reportObj.counter} times
                                        </td>
                                        <td className="text-center">
                                          {Math.round(
                                            (reportObj.timer /
                                              reportObj.counter) *
                                              1000
                                          ) / 1000}
                                          /{excercise.perActivityTime}
                                        </td>
                                        <td className="text-center">
                                          {reportObj.error}
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
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
