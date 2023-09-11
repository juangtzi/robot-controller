"use client";
import React, { useState } from "react";
import { Joystick, JoystickShape } from "react-joystick-component";
import "./globals.css";

export default function RemoteController() {
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
    console.log(data);
  };

  // Función para manejar el evento cuando el joystick se detiene
  const handleJoystickStop = (data) => {
    // Actualiza el estado con los datos del joystick
    setJoystickData(data);
    console.log(data);
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Robot Controller</h1>
      </header>

      <div className="joystickStyle">
        <Joystick
          controlPlaneShape={JoystickShape.AxisY}
          sticky={false}
          baseColor="grey"
          stickColor="black"
          move={handleJoystickMove}
          stop={handleJoystickStop}
          stickImage="https://i.ibb.co/cCbLywJ/arrow-v.jpg"
        ></Joystick>

        {/* Muestra la información del joystick en pantalla */}
        {/* <div className='informationStyle'> */}
        <div className="contentWrapper">
          <p>Type: {joystickData.type}</p>
          <p>Direction: {joystickData.direction}</p>
          <p>Distance: {joystickData.distance?.toFixed(2)}</p>
          <p>X: {joystickData.x?.toFixed(2)}</p>
          <p>Y: {joystickData.y?.toFixed(2)}</p>
        </div>
        {/* </div> */}

        <Joystick
          controlPlaneShape={JoystickShape.AxisX}
          sticky={false}
          baseColor="grey"
          stickColor="black"
          move={handleJoystickMove}
          stop={handleJoystickStop}
          stickImage="https://i.ibb.co/kHpp9qs/arrow.jpg"
        ></Joystick>
      </div>
    </div>
  );
}
