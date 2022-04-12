import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

export default function ViewProfile(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
  });
  const [allEvents, setAllEvents] = useState([]);
  const [reviewmessage, setreviewmessage] = useState("");
  const [review, setreview] = useState([]);

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
    if (localStorage.getItem("role") === "doctor") {
      navigate("*");
    }
    getUser();
    // eslint-disable-next-line
  }, []);

  // Separate function to get user details
  async function getUser() {
    const response = await fetch(
      `http://localhost:5000/api/auth/getDetails/${id}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setProfile(data);
    setreview(data.reviews);

    const response2 = await fetch(
      `http://localhost:5000/api/calendar/fetchallevents/${id}`,
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

  //razorpay
  // function loadScript(src) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  async function handleAddEvent() {
    try {
      // const res = await loadScript(
      //   "https://checkout.razorpay.com/v1/checkout.js"
      // );

      // if (!res) {
      //   alert("Razorpay SDK failed to load. Are you online?");
      //   return;
      // }

      // const data = await fetch(
      //   "http://localhost:5000/api/calendar/razorpay",
      //   {
      //     method: "POST",
      //   }
      // ).then((t) => t.json());

      // console.log(data);

      // const options = {
      //   key: "rzp_test_DVBH252dUcCnLO",
      //   currency: "INR",
      //   amount: "40000",
      //   order_id: data.id,
      //   name: "Exelligence",
      //   description: "Pay the following amount to book doctor",
      //   image:
      //     "https://res.cloudinary.com/rapidhack/image/upload/v1643878114/Medibles-logo_wpyytn.png",
      //   handler: function(response) {
      //     props.showAlert(
      //       "Payment Success!! Event Request Has been Sent to the Doctor Succesfully",
      //       "success"
      //     );
      //     // alert(response.razorpay_payment_id);
      //     // alert(response.razorpay_order_id);
      //     // alert(response.razorpay_signature);
      //   },
      // };
      // const paymentObject = new window.Razorpay(options);
      // paymentObject.open();

      const title = newEvent.title;
      const start = newEvent.start;
      const createdBy = localStorage.getItem("email");

      //call api for creating note
      const response = await fetch(
        `http://localhost:5000/api/calendar/addNotification/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, start, createdBy }),
        }
      );
      await response.json({ title, start, createdBy });
      setNewEvent({ title: "", start: "" });
      props.showAlert(
        "Appointment Success!! Please record your AROMs for better evaluation",
        "success"
      );
    } catch (error) {
      return error;
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/addreview/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ reviewmessage }),
        }
      );
      const res = await response.json();
      console.log(res.reviews);
      setreview(res.reviews);
      setreviewmessage("");
    } catch (error) {
      return error;
    }
  }
  async function onChange(e) {
    setreviewmessage(e.target.value);
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
          <div className="w3-twothird" style={{ paddingBottom: "15px" }}>
            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h3 className="w3-text-grey">
                <i className="fa fa-suitcase fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                Appointments
              </h3>
              <div>
                <h5>Add Appointment Request</h5>
                <input
                  className="mt-2"
                  type="text"
                  placeholder="Add Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  required
                />
                &nbsp;
                <input
                  className="mt-2"
                  type="date"
                  selected={newEvent.start}
                  onChange={(e) => {
                    setNewEvent({ ...newEvent, start: e.target.value });
                  }}
                />
                &nbsp;
                <button
                  className="btn btn-sm btn-primary my-2"
                  onClick={handleAddEvent}
                >
                  Add Event
                </button>
              </div>
              <div style={{ height: 300 }}>
                <Calendar
                  localizer={localizer}
                  events={allEvents}
                  startAccessor="start"
                  endAccessor="start"
                />
              </div>
            </div>
            <div className="w3-card w3-white">
              <h3 className="w3-text-grey mx-3" style={{ paddingTop: "20px" }}>
                <i className="fa fa-certificate fa-fw w3-margin-right w3-xlarge w3-text-blue"></i>
                Testimonial Section
              </h3>
              <section style={{ paddingTop: "1px", paddingBottom: "10px" }}>
                <div className="container my-3">
                  <div className="row">
                    {review.map((rev) => (
                      <div className="col-lg-3 col-md-8 pt-3">
                        <div
                          className="card  text-white bg-gradient-primary"
                          style={{ backgroundColor: "#231f38" }}
                        >
                          <div
                            className="card-body"
                            style={{ backgroundColor: "#28223f" }}
                          >
                            <h4 className="mt-0 text-white">{rev.review}</h4>
                            <div className="author align-items-center mt-2">
                              <div className="name">
                                <p
                                  style={{
                                    marginBottom: "0",
                                    color: "rgb(206, 205, 205)",
                                  }}
                                >
                                  {" "}
                                  {rev.fromName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-lg-3 mb-lg-0 me-auto my-3">
                      <div className="card h-100">
                        <div className="card-body d-flex flex-column justify-content-center text-center">
                          <i className="fa fa-plus text-secondary mb-3"></i>
                          <h5 className="text-secondary"> Add Testimonial </h5>
                          <form onSubmit={handleSubmit}>
                            <div className="input-group input-group-outline my-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Type a review"
                                name="reviewmessage"
                                value={reviewmessage}
                                onChange={onChange}
                                required
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-1">
                              <button
                                type="submit"
                                className="btn btn-primary btn-sm mb-0"
                              >
                                Add Review
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
