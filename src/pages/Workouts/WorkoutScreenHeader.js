import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUserType } from "../../features/userSlice";
import { Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import CloseIcon from "@material-ui/icons/Close";
const WorkoutScreenHeader = ({ name, navigation }) => {
  const userType = useSelector(selectUserType);
  const history = useHistory();
  const [showMore, setshowMore] = useState(false);

  return (
    <div className="workoutsHeader">
      <div className="workoutsHeader__info">
        <div
          onClick={() => history.goBack()}
          style={{ marginTop: 20, display: "flex", alignItems: "center" }}
        >
          <ArrowBackIosRoundedIcon
            style={{ height: 18, width: 18, padding: 5, cursor: "pointer" }}
          />
          <Typography variant="h6" style={{ fontSize: 25, marginLeft: 5 }}>
            {name}
          </Typography>
        </div>
      </div>
      {userType == "coach" && name === "Workouts" && (
        <div
          className="addWorkout__button"
          onClick={() =>
            history.push({
              pathname: "/long-term-training",
            })
          }
        >
          <img src="/assets/plus_thin.png" alt="" width="15px" height="15px" />
          <h5>ADD LONG TERM Workout</h5>
        </div>
      )}

      {userType == "athlete" && name === "Workouts" && (
        <div
          className="addWorkout__button"
          onClick={() =>
            history.push({
              pathname: "/create-workout",
            })
          }
        >
          <img src="/assets/plus_thin.png" alt="" width="15px" height="15px" />
          <h5>Add Workout</h5>
        </div>
      )}
      {userType === "coach" && name === "Workouts" && (
        <div
          className="addWorkout__button"
          onClick={() => history.push("create-workout")}
        >
          <img src="/assets/plus_thin.png" alt="" width="15px" height="15px" />
          <h5>CREATE WORKOUT</h5>
        </div>
      )}
      {userType === "coach" && name === "Workouts" && (
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "5px 20px",
              marginTop: 20,
              marginRight: 20,
            }}
            onClick={() => {
              setshowMore(!showMore);
            }}
          >
            {showMore ? <CloseIcon /> : <MoreVertIcon />}
          </div>
          {showMore && (
            <div>
              <div
                className="addWorkout__button"
                onClick={() => history.push("add-own-workout")}
                style={{ position: "absolute", top: 50, right: 10, width: 150 }}
              >
                <img
                  src="/assets/plus_thin.png"
                  alt=""
                  width="15px"
                  height="15px"
                />
                <h5>ADD OWN WORKOUT</h5>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutScreenHeader;
