import React from "react";
import NutritionGoalProgress from "../../Components/NutritionGoalProgress/NutritionGoalProgress";
import Compliance_report from "../Reports/Compliance_report";
import Reports from "../Reports/Reports";
import {useHistory} from "react-router-dom";

function AthleteHomeReports() {
  const history = useHistory();
  return (
    <div className="home__reports">
      <h1 onClick={() => history.push("/reports")} style={{fontFamily: 'Open_Sans'}}>Reports</h1>
      <div className="home__reportsMainContainer">
      <Reports showOthers={false} />
      {/*  <div className="home__reportsLeftContainer">
          <h1>Compliance</h1>
          <div style={{ width: "100%" }}>
            <Compliance_report height={150} />
          </div>
        </div>
        <div className="home__reportsRightContainer">
          <h1>Nutrition Progress</h1>
          <div style={{ width: "100%" }}>
            <div
              className="chart_container"
              style={{
                height: 200,
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <NutritionGoalProgress />
            </div>
          </div>
        </div> */}
      </div> 
    </div>
  );
}

export default AthleteHomeReports;
