import React, { useState } from "react";
import "./styles.css";
import { Joystick, JoystickShape } from "react-joystick-component";

const JoystickC = ({ onMove }) => {
  const [joystickData, setJoystickData] = useState({
    type: "",
    direction: "",
    distance: 0,
    x: 0,
    y: 0,
  });

  // Función para manejar el evento cuando el joystick se mueve
  const handleJoystickMove = (data) => {
    // Actualiza el estado con los datos del joystick
    setJoystickData(data);
    onMove(data.direction);
    
    //console.log(data.direction);
  };

  // Función para manejar el evento cuando el joystick se detiene
  const handleJoystickStop = (data) => {
    // Actualiza el estado con los datos del joystick
    setJoystickData(data);
  };

  return (
    <div className="joystickStyle">
      <Joystick
        controlPlaneShape={JoystickShape.AxisX}
        sticky={false}
        baseColor="grey"
        stickColor="black"
        move={handleJoystickMove}
        stop={handleJoystickStop}
      ></Joystick>

      <Joystick
        controlPlaneShape={JoystickShape.AxisY}
        sticky={false}
        baseColor="grey"
        stickColor="black"
        move={handleJoystickMove}
        stop={handleJoystickStop}
      ></Joystick>
    </div>
  );
};

export default JoystickC;
