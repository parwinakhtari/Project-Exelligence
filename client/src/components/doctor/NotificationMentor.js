import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationMentor(props) {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
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

  async function handleAddEvent(title, start, end, createdBy, notiId) {
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
          body: JSON.stringify({ title, start, end, createdBy, notiId }),
        }
      );
      await response.json({ title, start, end, createdBy });
      props.showAlert(
        "Booking Request Has been Accepted Succesfully",
        "success"
      );
      //call api for deleting event
      await fetch(
        `http://localhost:5000/api/calendar/deleteevent/${notiId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      
      const newNoti = profile.filter((notify) => {
        return notify._id !== notiId;
      });
      setProfile(newNoti);
    } catch (error) {
      return error;
    }
  }

  async function handleReject(notiId){
      try {
        await fetch(
            `http://localhost:5000/api/calendar/deleteevent/${notiId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          
          const newNoti = profile.filter((notify) => {
            return notify._id !== notiId;
          });
          props.showAlert(
            "Booking Request Has been Rejected Succesfully",
            "danger"
          );
          setProfile(newNoti);
          
      } catch (error) {
        return error;
      }
  }

  return (
    <div className="container">
      {
        <div className="col-12 mt-5">
        <h2>Booking Requests to you</h2>
          <div className="row">
          <h5 className="mt-3">{profile.length === 0 && "No Booking Requests Yet"}</h5>  
            {profile.map((profile, index) => (
              <div className="col-4 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 d-flex">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h4>{profile.title}</h4>
                    <p
                      className="card-text"
                      style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                    >
                      <b>Start Date :</b> {profile.start.substring(0, 10)}
                    </p>
                    <p
                      className="card-text"
                      style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                    >
                      <b>End Date :</b> {profile.end.substring(0, 10)}
                    </p>
                    <p
                      className="card-text"
                      style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                    >
                      <b>Booking By :</b> {profile.createdBy}
                    </p>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => {
                        handleAddEvent(
                          profile.title,
                          profile.start,
                          profile.end,
                          profile.createdBy,
                          profile._id
                        );
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleReject(
                          profile._id
                        );
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
      }
    </div>
  );
}
