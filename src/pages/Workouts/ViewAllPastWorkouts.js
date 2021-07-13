import React from "react";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { selectUserData, selectUserType } from "../../features/userSlice";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import WorkoutScreenHeader from "./WorkoutScreenHeader";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function PastWorkouts() {
  const userData = useSelector(selectUserData);
  const userType = useSelector(selectUserType);
  const [workouts, setWorkouts] = React.useState([]);
  const [pastWorkouts, setPastWorkouts] = React.useState([]);

  const [search, setsearch] = React.useState("");
  const [SearchList, setSearchList] = React.useState(null);
  const [SearchLoading, SetSearhLoading] = React.useState(false);

  const [sorting, setsorting] = React.useState("desc");

  React.useEffect(() => {
    setSearchList(pastWorkouts);
  }, [pastWorkouts]);

  const getSearchList = async (e) => {
    SetSearhLoading(true);
    setsearch(e.target.value);
    if (e.target.value) {
      const names = await pastWorkouts?.filter((workout) => {
        return workout.data.preWorkout.workoutName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });

      setSearchList(names);
      SetSearhLoading(false);
    } else {
      setSearchList(pastWorkouts);
      SetSearhLoading(false);
    }
  };

  React.useEffect(async () => {
    SetSearhLoading(true);

    if (search?.length > 0) {
      const names = await pastWorkouts?.filter((workout) => {
        return workout.data.preWorkout.workoutName
          .toLowerCase()
          .includes(search.toLowerCase());
      });

      setSearchList(names);
      SetSearhLoading(false);
    } else {
      setSearchList(pastWorkouts);
      SetSearhLoading(false);
    }
  }, [search]);

  React.useEffect(() => {
    if (userData) {
      // db.collection("workouts")
      //   .where("assignedToId", "==", userData?.id)
      //   .orderBy("timestamp", sorting)
      //   .where("completed", "==", false)
      //   // .limit(4)
      //   .onSnapshot((snapshot) => {
      //     setWorkouts(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         data: doc.data(),
      //       }))
      //     );
      //   });

      db.collection("workouts")
        .where("assignedToId", "==", userData?.id)
        .where("completed", "==", true)
        // .limit(4)
        .orderBy("timestamp", sorting)
        .onSnapshot((snapshot) => {
          setPastWorkouts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [userData?.id, sorting]);

  const options = [
    { value: "asc", label: "Recent" },
    { value: "desc", label: "old" },
  ];

  return (
    <div style={{ minHeight: "99.7vh" }}>
      <WorkoutScreenHeader name="Past Workouts" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: 20,
            backgroundColor: "white",
            padding: 5,
            display: "flex",
            alignItems: "center",
            border: "1px solid black",
            width: "500px",
            borderRadius: 10,
          }}
        >
          <input
            value={search}
            style={{
              width: "100%",

              fontSize: 20,
              outline: "none",
              border: "none",
            }}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          {search?.length == 0 ? (
            <SearchIcon
              style={{
                width: 30,
                height: 30,
              }}
            />
          ) : (
            <div
              onClick={() => {
                setsearch("");
              }}
            >
              <ClearIcon
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            width: 150,
            marginLeft: "auto",
          }}
        >
          <Dropdown
            options={options}
            placeholder="Order By"
            onChange={(s) => {
              setsorting(s.value);
            }}
          />
        </div>
      </div>
      {search?.length > 0 && (
        <div
          style={{
            fontSize: 13,
            marginLeft: 20,
          }}
        >
          {SearchList?.length} results found
        </div>
      )}
      <div style={{ width: "50%", marginLeft: 20 }}>
        {SearchList?.length > 0 ? (
          SearchList?.map((workout, i) => (
            <WorkoutCard
              key={workout.id}
              workouts={workouts}
              item={workout}
              idx={i}
              type={"non-editable"}
              completed={true}
            />
          ))
        ) : (
          <div
            style={{
              backgroundColor: "#fff",
              width: "100%",
              height: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <h5
              style={{
                fontSize: "12px",
                fontWeight: "normal",
              }}
            >
              There are no Past Workouts for now
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default PastWorkouts;
