import React from "react";

const ProgressBarComponent = ({ containerWidth, progress, progressColor }) => {
  return (
    <div
      style={{
        width: containerWidth,
        height: 10,
        borderRadius: "5px",
        backgroundColor: "#ddd",
      }}
    >
      <div
        style={{
          backgroundColor: progressColor,
          positon: "absolute",
          maxWidth: `${progress}%`,
          height: 10,
          borderRadius: 15,
        }}
      ></div>
    </div>
  );
};

export default ProgressBarComponent;
