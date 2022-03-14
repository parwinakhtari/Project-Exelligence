import React from "react";

function Alert(props) {
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {props.alert.msg} <h4 className="d-inline" style={{fontWeight:"bold"}}>{props.alert.otp}</h4>
        </div>
      )}
    </div>
  );
}
export default Alert;
