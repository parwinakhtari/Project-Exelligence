import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      `https://exelligence-backend.herokuapp.com/api/calendar/fetchallnoti`,
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
        `https://exelligence-backend.herokuapp.com/api/calendar/addevent`,
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
      await fetch(`https://exelligence-backend.herokuapp.com/api/calendar/deleteevent/${notiId}`, {
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
      await fetch(`https://exelligence-backend.herokuapp.com/api/calendar/deleteevent/${notiId}`, {
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
            <div className="col-4 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 d-flex">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h4>Appointment for {profile.title}</h4>
                  <p
                    className="card-text"
                    style={{ fontSize: "14px", marginBottom: "0.2rem" }}
                  >
                    <b>Date :</b> {profile.start.substring(0, 10)}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "14px", marginBottom: "1rem" }}
                  >
                    <b>Requested By :</b> {profile.createdBy}
                  </p>

                  <button
                    className="btn btn-success mx-2"
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
                    className="btn btn-danger"
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
