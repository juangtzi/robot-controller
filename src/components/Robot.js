import React from "react";
import "./styles.css";

const Robot = ({ x, y, angle }) => {
  const waveX = x + 10;
  const waveY = y;

  const style = {
    left: `${x}px`,
    top: `${y}px`,
    transform: `rotate(${angle}deg)`,
  };

  return (
    <div>
      <div className="robot" style={style}></div>
      <div
        className="wave"
        style={{ left: `${waveX}px`, top: `${waveY}px` }}
      ></div>
    </div>
  );
};

export default Robot;
