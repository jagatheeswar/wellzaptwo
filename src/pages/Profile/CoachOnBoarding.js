import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header/Header";
import {
  selectTemperoryId,
  selectUser,
  selectUserType,
  setTemperoryData,
  selectUserData,
} from "../../features/userSlice";
import { db } from "../../utils/firebase";
import "./Profile.css";

function CoachOnBoarding() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const userDataN = useSelector(selectUserData);
  const temperoryId = useSelector(selectTemperoryId);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setdob] = useState("");
  const [certificates, setCertificates] = useState("");
  const [awards, setAwards] = useState("");
  const [editable, seteditable] = useState(false);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (userType === "coach") {
      db.collection("coaches")
        // .doc(temperoryId)
        .where("email", "==", user)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setUserData({
              id: doc.id,
              data: doc.data(),
            });

            setphone(doc.data()?.phone);
            setemail(doc.data()?.email);
            setgender(doc.data()?.gender);
            setaddress(doc.data()?.address);
            setdob(doc.data()?.dob);
            setCertificates(doc.data()?.certificates);
            setAwards(doc.data()?.awards);
          });
          // dispatch(
          //   setTemperoryData({
          //     id: temperoryId,
          //     data: snap.data(),
          //   })
          // );
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("coaches")
        .doc(userData?.data?.listOfCoaches[0])
        .get()
        .then(function (snap) {
          setphone(snap.data()?.phone);
          setemail(snap.data()?.email);
          setgender(snap.data()?.gender);
          setaddress(snap.data()?.address);
          setdob(snap.data()?.dob);
          setCertificates(snap.data()?.certificates);
          setAwards(snap.data()?.awards);
        });
    }
  }, [user, temperoryId]);
  const saveprofile = () => {
    const dob1 = dob.split("-").reverse().join("-");
    db.collection("coaches")
      .doc(temperoryId)
      .update({
        phone: phone,
        email: email,
        gender: gender,
        address: address,
        dob: dob1,
        certificates: certificates,
        awards: awards,
      })
      .then((res) => seteditable(false))
      .catch((e) => console.log(e));
  };

  console.log(editable);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Header coachProfile={true} />
      </div>
      <div className="coachProfileForm" style={{ margin: 25 }}>
        <div className="coachProfile__info">
          <div className="coachProfile__heading">
            <h2>Profile</h2>
          </div>
        </div>
        <form>
          {/* <h4>Mobile Number</h4>
          <input
            readOnly={!editable}
            onChange={(e) => {
              setphone(e.target.value);
            }}
            value={phone}
            type="text"
            placeholder="+91 56985 45955"
          />
          <h4>Email ID</h4>
          <input
            readOnly={!editable}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="anishchandra@gmail.com"
          />
          <h4>Gender</h4>
          <input
            readOnly={!editable}
            onChange={(e) => {
              setgender(e.target.value);
            }}
            value={gender}
            type="text"
            placeholder="Enter Gender"
          />
          <h4>Date of Birth</h4>
          <input
            onChange={(e) => {
              setdob(e.target.value);
            }}
            readOnly={!editable}
            type="date"
            placeholder="Enter Date of Birth"
          /> */}
          <h4>Certificates</h4>
          <textarea
            onChange={(e) => {
              setCertificates(e.target.value);
            }}
            readOnly={!editable}
            type="text"
            placeholder={
              userType === "coach" ? "Enter certificates" : "Certificates"
            }
          />
          <h4>Awards</h4>
          <textarea
            onChange={(e) => {
              setAwards(e.target.value);
            }}
            readOnly={!editable}
            type="text"
            placeholder={userType === "coach" ? "Enter Awards" : "Awards"}
          />
          {userType === "coach" ? (
            <>
              <h4>Billing Address</h4>
              <textarea
                readOnly={!editable}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
                value={address}
                type="text"
                placeholder="300, Baneerghatta Main Rd, opp to Apollo   Hospitals, Sundar Ram Shetty Nagar, Bilekahali, Bengaluru, Karnataka - 560076"
              />
            </>
          ) : (
            <></>
          )}
        </form>
        {userType === "coach" ? (
          <div style={{ display: "flex" }}>
            <div
              className="coachProfileForm__Button"
              style={{ marginRight: 20 }}
              onClick={(e) => {
                const dob1 = dob.split("-").reverse().join("-");
                db.collection("coaches")
                  .doc(temperoryId)
                  .update({
                    // phone: phone,
                    // email: email,
                    // gender: gender,
                    address: address,
                    // dob: dob1,
                    certificates: certificates,
                    awards: awards,
                  })
                  .then((res) => {
                    alert("Success");
                    history.push("/");
                  })
                  .catch((e) => console.log(e));
              }}
            >
              Submit
            </div>
            <div
              className="coachProfileForm__Button"
              onClick={(e) => {
                history.push("/");
              }}
            >
              Skip
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CoachOnBoarding;
