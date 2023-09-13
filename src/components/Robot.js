import React from "react";
import "./styles.css";

const Robot = ({ x, y }) => {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
  };

  return <div className="robot" style={style}></div>;
};

export default Robot;
