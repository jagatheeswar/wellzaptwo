import React from "react";

import { useState, useEffect } from "react";

import { db } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../features/userSlice";
import DatePicker from "react-datepicker";
import "./Postworkout.css";
import firebase from "firebase";
import Icon from "@material-ui/core/Icon";
import moment from "moment";
import { useLocation } from "react-router";
import { DriveEtaOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import WorkoutScreenHeader from "./WorkoutScreenHeader";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import CloseIcon from "@material-ui/icons/Close";

import MoodBadIcon from "@material-ui/icons/MoodBad";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  DialogContentText,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AthleteCreateWorkout() {
  const userData = useSelector(selectUserData);
  const location = useLocation();
  const history = useHistory();

  const [workoutDurationPlanned, setWorkoutDurationPlanned] = useState("");
  const [calories, setCalories] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState("");
  const [selectedWorkoutEdit, setSelectedWorkoutEdit] = useState("");
  const [group, setGroup] = useState([]);
  const [postWorkout, setPostWorkout] = useState([]);
  const [workoutId, setWorkoutId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [path, setPath] = useState("");
  const [preWorkout, setPreWorkout] = useState(null);
  const [workoutsCount, setWorkoutsCount] = useState(0);
  const [averageWorkoutTime, setAverageWorkoutTime] = useState(0);
  const [workoutVideoUrl, setWorkoutVideoUrl] = useState("");
  const [workout, setWorkout] = useState({});
  const [workoutName, setworkoutName] = useState("");

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (userData?.id) {
      db.collection("athletes")
        .doc(userData.id)
        .onSnapshot((doc) => {
          setWorkoutsCount(doc.data()?.completedWorkouts);
          setAverageWorkoutTime(doc.data()?.averageWorkoutTime);
        });
    }
  }, [userData?.id]);

  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  useEffect(() => {
    console.log(location?.state?.workout.data);
    if (location.state?.workout) {
      alert(2);
      setGroup([
        {
          exercises:
            location.state?.workout?.data?.preWorkout?.selectedExercises,
        },
      ]);
      setPostWorkout(location.state?.workout?.data?.preWorkout);
      setPreWorkout(location.state?.workout?.data?.preWorkout);
      setWorkout(location.state?.workout);

      setWorkoutId(location.state?.workout?.id);
      setCalories(
        location.state?.workout?.data?.preWorkout?.caloriesBurnEstimate
      );
      setWorkoutDurationPlanned(
        location.state?.workout?.data?.preWorkout?.workoutDuration
      );
    }
  }, [location.state?.workout]);

  useEffect(() => {
    console.log("ctd", location.state?.completed);
    if (location.state?.completed && location.state?.workout) {
      // setGroup(location.state?.workout?.data?.postWorkout?.group);
      // setPostWorkout(location.state?.workout?.data?.pre);
      setCompleted(location?.state?.completed);
    }
  }, [location.state?.completed, location.state?.workout]);

  // useEffect(() => {
  //   if (group && postWorkout && !location.state?.completed) {
  //     let temp = { ...postWorkout };
  //     temp.group = group;
  //     setPostWorkout(temp);
  //   }
  // }, [group]);

  function TimeToMinutes(time) {
    var hms = time; // your input string
    var a = hms.split(":"); // split it at the colons

    // Hours are worth 60 minutes.
    var minutes = +a[0] * 60 + +a[1];

    return minutes;
  }

  return (
    <div className="Postworkout__container">
      {/* <div>
        <h3>Post Workout details</h3>
      </div> */}
      <WorkoutScreenHeader name="Post Workout details" />
      <div className="Postworkout__body">
        <h4> Title</h4>
        <input
          style={{
            borderWidth: 1,
            borderColor: "#DBE2EA",
            borderwidth: 1,
            height: 25,
            color: "black",
            textAlign: "left",
            backgroundColor: "white",
            padding: "10px 10px",
          }}
          // value={postWorkout?.workoutDuration}
          placeholder="Title"
          disabled={completed}
          value={postWorkout?.workoutName}
          onChange={(newValue) => {
            let temp = { ...postWorkout };
            temp.workoutName = newValue.target.value;
            console.log(postWorkout);
            setPostWorkout(temp);
          }}
        />
        <h4 style={{ borderTop: 20 }}>Date</h4>

        <div className="Datepicker__container">
          <DatePicker
            placeholder="Set Date"
            // dateFormat="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            selected={
              postWorkout?.date
                ? new Date(moment(postWorkout.date))
                : new Date()
            }
            onChange={(date) => {
              let temp = { ...postWorkout };

              temp["date"] = date;
              console.log(postWorkout);
              setPostWorkout(temp);
            }}
            disabled={completed ? true : false}
          />
        </div>
        <div className="Planned_data">
          <div style={{ width: 100 }}>Duration</div>

          <div style={{}}>
            <div>
              Completed <span style={{ fontSize: 14 }}>(HH:MM:SS)</span>
            </div>
            <input
              type="time"
              style={{
                borderWidth: 1,
                borderColor: "#DBE2EA",
                borderwidth: 1,
                height: 25,
                color: "black",
                backgroundColor: "white",
                borderRadius: 8,
                padding: 7,
                width: "100%",
                textAlign: "center",
              }}
              step="1"
              value={postWorkout?.workoutDuration}
              placeholder="HH : MM : SS"
              disabled={completed}
              onChange={(itemValue) => {
                let temp = { ...postWorkout };

                temp["workoutDuration"] = itemValue.target.value;
                console.log(postWorkout);
                setPostWorkout(temp);
              }}
              setselectedworkouteditable={completed ? false : true}
            />
          </div>
        </div>
        {/* <div className="Planned_data">
          <div style={{ width: 120 }}>Calories</div>
          <input
            style={{
              borderWidth: 1,
              borderColor: "#DBE2EA",
              backgroundColor: "#fcd11c",
              color: "black",

              borderRadius: 8,
              padding: 7,
              height: 25,
              textAlign: "center",
            }}
            value={calories}
            disabled={completed}
            onChange={setCalories}
            setselectedworkouteditable={false}
          />
        </div> */}

        <div
          style={{
            width: "100%",
          }}
        >
          <h3 style={{ fontSize: 14, marginVertical: 7 }}>Description</h3>
          <textarea
            style={{
              borderWidth: 1,
              borderColor: "#DBE2EA",
              backgroundColor: "#fff",
              width: "100%",
              borderRadius: 8,
              textAlignVertical: "top",
              padding: 20,

              marginBottom: 15,
              boxSizing: "border-box",
            }}
            type="textarea"
            disabled={completed}
            value={postWorkout?.description}
            onChange={(newValue) => {
              let temp = { ...postWorkout };
              temp.description = newValue.target.value;
              console.log(postWorkout);
              setPostWorkout(temp);
            }}
            multiline={true}
            underlineColorAndroid="transparent"
            numberOfLines={4}
            placeholder="Enter Description"
            editable={completed ? false : true}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignSelf: "flex-start",
            width: 400,
          }}
        >
          <h3 style={{ fontSize: 15, marginBottom: 7, color: "black" }}>
            PostWorkout fatigue level
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <button
                style={{
                  border: "none",
                }}
                onClick={() => {
                  if (!completed) {
                    let temp = { ...postWorkout };
                    temp.fatigue = "very-sore";
                    setPostWorkout(temp);
                  }
                }}
              >
                <SentimentVeryDissatisfiedIcon
                  style={{
                    fill: `${
                      postWorkout?.fatigue === "very-sore" ? "red" : "black"
                    }`,
                    height: 70,
                    width: 70,
                  }}
                />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginRight: 15,
              }}
            >
              <button
                style={{
                  border: "none",
                }}
                onClick={() => {
                  if (!completed) {
                    let temp = { ...postWorkout };
                    temp.fatigue = "moderately-sore";
                    setPostWorkout(temp);
                  }
                }}
              >
                <SentimentSatisfiedIcon
                  style={{
                    fill: `${
                      postWorkout?.fatigue === "moderately-sore"
                        ? "#ffe486"
                        : "black"
                    }`,
                    height: 70,
                    width: 70,
                  }}
                />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <button
                style={{
                  border: "none",
                }}
                onClick={() => {
                  if (!completed) {
                    let temp = { ...postWorkout };
                    temp.fatigue = "not-sore";
                    setPostWorkout(temp);
                  }
                }}
              >
                <InsertEmoticonIcon
                  style={{
                    fill: `${
                      postWorkout?.fatigue === "not-sore" ? "green" : "black"
                    }`,
                    height: 70,
                    width: 70,
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {!completed && false && (
        <div style={{ width: 300, marginTop: 20 }}>
          <h3 style={{ color: "black", textAlign: "left" }}>
            Upload Post Workout Image
          </h3>
          <div style={{ marginTop: 20, flexDirection: "row" }}>
            <img
              src={imageUrl ? `${imageUrl}` : null}
              style={{
                margin: 10,
                width: 100,
                height: 150,
                borderRadius: 100,
                backgroundColor: "grey",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                marginLeft: 20,
              }}
            >
              <button
                style={{ marginVertical: 15 }}
                //onClick={getImageFromCamera}
              >
                {/* <AntDesign name="camera" size={RFValue(24, 816)} /> */}
              </button>

              <button // onClick={getImageFromGallery}
              >
                {/* <FontAwesome name="photo" size={RFValue(24, 816)} /> */}
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        style={{
          backgroundColor: "#ffe486",
          padding: 10,
          borderRadius: 15,
          width: 300,
          height: 100,
          marginVertical: 100,
          marginTop: 20,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
        className="Submit__button"
        onClick={() => {
          if (completed) {
            history.push("/workouts");
          } else {
            console.log(workoutId, postWorkout, userData?.id);
            if (!postWorkout?.date) {
              let temp = { ...postWorkout };
              temp.date = formatDate();
              setPostWorkout(temp);
              //  postWorkout.date = formatDate();
            }
            console.log("ppw", postWorkout);
            if (postWorkout?.workoutName && postWorkout?.description) {
              db.collection("AthleteWorkouts")
                .doc(userData?.id)
                .collection(
                  postWorkout?.date ? postWorkout?.date : formatDate()
                )
                .add({
                  completed: true,
                  preWorkout: postWorkout,

                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((s) => {
                  console.log(s);
                  db.collection("CoachNotifications")
                    .doc(userData.data.listOfCoaches[0])
                    .collection("notifications")
                    .add({
                      message: `${userData?.data?.name} has completed Workout ${
                        postWorkout?.workoutName
                      } on ${postWorkout.date || formatDate()} `,
                      seen: false,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                      athlete_id: userData.id,
                    });

                  db.collection("athletes")
                    .doc(userData.id)
                    .update({
                      completedWorkouts: workoutsCount + 1,
                      averageWorkoutTime:
                        (parseFloat(averageWorkoutTime) * workoutsCount +
                          TimeToMinutes(
                            postWorkout?.workoutDuration ||
                              postWorkout?.workoutDuration ||
                              "00:00:00"
                          )) /
                        (workoutsCount + 1),
                    })
                    .then(() => setModal(true));
                });
            } else {
              alert("please fill all required fields");
            }
          }
        }}
      >
        <h3
          onClick={() => {
            history.push("/workouts");
          }}
          style={{ fontSize: 14, color: "black", fontWeight: "bold" }}
        >
          {completed ? "Return" : "Complete Workout"}
        </h3>
      </button>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        // fullWidth
        onClose={handleCloseDialog}
      >
        <DialogContent>
          {/* <video width="500" height="500" controls>
            <source src={workoutVideoUrl} type="video/mp4" />
          </video> */}
          <div
            dangerouslySetInnerHTML={{
              __html: `<iframe title="video" height="470" width="730" frameborder="0" src="https://player.vimeo.com/video/${workoutVideoUrl.substring(
                workoutVideoUrl.lastIndexOf("/") + 1
              )}"></iframe>`,
            }}
          />
          <div
            onClick={handleCloseDialog}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 0,
              top: 0,
              padding: 12,
            }}
          >
            {" "}
            <CloseIcon />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
