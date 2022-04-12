import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
// import stethescope from "./stethoscope-svgrepo-com.svg";

export default function About(props) {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

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
    const response2 = await fetch(
      `http://localhost:5000/api/calendar/fetchmyEvents`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const events = await response2.json();
    setAllEvents(events);
  }

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
                  {profile.name}
                </h2>
                <hr />
                <p>
                  <i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  {profile.specialization} at {profile.hospital}
                </p>
                <p>
                  <i className="fa fa-cogs fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  Years of experience - {profile.experience}
                </p>
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
                  <i className="fa fa-book-open fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  Specialization - {profile.specialization}
                </p>
                <p>
                  <i className="fa fa-money fa-fw w3-margin-right w3-large w3-text-blue"></i>
                  ₹ 400 Consultation fee
                </p>
                <br />
              </div>
            </div>
            <br />
          </div>
          <div className="w3-twothird">
            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h3 className="w3-text-grey">
                <i className="fa fa-suitcase fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                Appointments
              </h3>
              <div>
                <div style={{ height: 300 }}>
                  <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="start"
                  />
                </div>

                <div className="row my-3">
                  {allEvents.map((booking, index) => (
                    <div>
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h4>Appointment for {booking.title}</h4>
                          <p
                            className="card-text"
                            style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                          >
                            <b>Date :</b> {booking.start.substring(0, 10)}
                          </p>
                          <p
                            className="card-text"
                            style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                          >
                            <b>Patient :</b> {booking.createdBy}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w3-card w3-white">
              <h3 className="w3-text-grey mx-3" style={{ paddingTop: "20px" }}>
                <i className="fa fa-certificate fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                Testimonial Section
              </h3>
              <div>
                {profile.reviews && profile.reviews.length === 0 ? (
                  <h5
                    className="mt-3"
                    style={{ paddingLeft: "30px", paddingBottom: "25px" }}
                  >
                    No testimonials Yet{" "}
                  </h5>
                ) : (
                  ""
                )}
                {profile.reviews &&
                  profile.reviews.map((rev) => (
                    <section style={{ padding: "2px" }}>
                      <div className="container my-3">
                        <div className="row">
                          <div className="col-lg-3 col-md-8 pt-3">
                            <div
                              className="card  text-white bg-gradient-primary"
                              style={{ backgroundColor: "#231f38" }}
                            >
                              <div
                                className="card-body"
                                style={{ backgroundColor: "#28223f" }}
                              >
                                <h4 className="mt-0 text-white">
                                  {rev.review}
                                </h4>
                                <div className="author align-items-center mt-2">
                                  <div className="name">
                                    <p
                                      style={{
                                        marginBottom: "0",
                                        color: "rgb(206, 205, 205)",
                                      }}
                                    >
                                      {rev.fromName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
