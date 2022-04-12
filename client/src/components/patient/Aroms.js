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
      `http://localhost:5000/api/auth/getUser`,
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
          {profile.arom && profile.aroms.length === 0 &&
            "Not recorded Yet! Record your AROMS for better evalution"}
        </h4>
        <h5>For Back Pain</h5>
        <a
          type="button"
          className="btn btn-success"
          href={`http://localhost:8000/flexion${profile._id}`}
          target="_blank"
          rel="noreferrer"
        >
          Record Aroms for flexion
        </a>
        <a
          type="button"
          className="btn btn-success  my-3"
          href={`http://localhost:8000/extension,${profile._id}`}
          target="_blank"
          rel="noreferrer"
        >
          Record Aroms for extension
        </a>
        <a
          type="button"
          className="btn btn-success"
          href={`http://localhost:8000/aroms/lateralflexion,${profile._id}`}
          target="_blank"
          rel="noreferrer"
        >
          Record Aroms for Lateral flexion
        </a>
        {profile.aroms?(
          <>
          <div className="w3-container w3-card w3-white w3-margin-bottom mt-5">
            <div className="row">
              <div className="w3-container">
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
                                    <td className="text-center">{activity.name}</td>
                                    <td className="text-center">{Math.round((activity.min)*1000)/1000} degree</td>
                                    <td className="text-center">{Math.round((activity.max)*1000)/1000} degree</td>
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
        ):
          <>
          </>
        }
      </div>
    </div>
  );
};
