import React from "react";
import CalendarComponent from "../../Components/Calendar/CalendarComponent";
import Notification from "../../Components/Notifications/Notification";
import Calendar_ from "./Calendar";

function RightContainer() {
  return (
    <div className="rightContainer">
      <Notification />
      <Calendar_ />
      {/* <CalendarComponent /> */}
    </div>
  );
}

export default RightContainer;
