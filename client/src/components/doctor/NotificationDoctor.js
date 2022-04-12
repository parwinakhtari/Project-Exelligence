import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotificationDoctor(props) {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "patient") {
      navigate("*");
    }
    getUser();
    // eslint-disable-next-line
  }, []);

  // Separate function to get user details

  async function getUser() {
    const response = await fetch(
      `http://localhost:5000/api/calendar/fetchallnoti`,
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

  async function handleAddEvent(title, start, createdBy, notiId, createdById) {
    try {
      //call api for creating calendarevent
      const response = await fetch(
        `http://localhost:5000/api/calendar/addevent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title,
            start,
            createdBy,
            notiId,
            createdById,
          }),
        }
      );
      await response.json({ title, start, createdBy });
      props.showAlert(
        "Appointment Request Has been Accepted Succesfully",
        "success"
      );
      //call api for deleting event
      await fetch(`http://localhost:5000/api/calendar/deleteevent/${notiId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const newNoti = profile.filter((notify) => {
        return notify._id !== notiId;
      });
      setProfile(newNoti);
    } catch (error) {
      return error;
    }
  }

  async function handleReject(notiId) {
    try {
      await fetch(`http://localhost:5000/api/calendar/deleteevent/${notiId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const newNoti = profile.filter((notify) => {
        return notify._id !== notiId;
      });
      props.showAlert(
        "Appointment Request Has been Rejected Succesfully",
        "danger"
      );
      setProfile(newNoti);
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="container">
      <div className="col-12 mt-5 ">
        <h2>Appointment Requests</h2>
        <div className="row">
          <h5 >
            {profile.length === 0 && "No Appointment Requests Yet"}
          </h5>
          {profile.map((profile, index) => (
            <div>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h4>Appointment for {profile.title}</h4>
                  <p
                    className="card-text"
                    style={{ fontSize: "14px", marginBottom: "0.2rem" }}
                  >
                    <b>Date :</b> {profile.start.substring(0, 10)}
                  </p>
                  <b>Requested By :</b>
                  <p
                    className="card-text"
                    style={{ fontSize: "14px", marginBottom: "1rem" }}
                  ><Link
                  to={`/viewProfilePatient/${profile.createdById}`}
                  className="btn btn-primary"
                >
                   {profile.createdBy}

                </Link>

                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleAddEvent(
                        profile.title,
                        profile.start,
                        profile.createdBy,
                        profile._id,
                        profile.createdById
                      );
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      handleReject(profile._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
