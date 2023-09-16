"use client";
import React, { useState, useRef } from "react";

import dynamic from "next/dynamic";

const JoystickY = dynamic(() => import("../components/NormalJoystick"), {
  ssr: false,
});

const JoystickAngle = dynamic(() => import("../components/AngleJoystick"), {
  ssr: false,
});

import Robot from "../components/Robot";

//import Room from "../components/Room";
//import NormalJoystick from "@/components/NormalJoystick";
//import AngleJoystick from "@/components/AngleJoystick";

const Home = () => {
  const [position, setPosition] = useState({ x: 150, y: 150 });

  const [degree, setDegree] = useState(0);
  const myDegreeRef = useRef(degree);

  let { x, y } = position;

  const handleJoystickData = (data) => {
    //console.log("Grados:", myDegreeRef.current);
    //console.log(data);

    let maxJoystickForce = 0;

    // Obtener el valor de fuerza actual del joystick
    const joystickForce = data?.force;

    // Actualizar el valor máximo si es necesario
    if (joystickForce > maxJoystickForce) {
      maxJoystickForce = joystickForce;
      
    }
    //console.log("Fuerza Maxima:", maxJoystickForce);

    // Normalizar el valor de fuerza utilizando el valor máximo observado
    const scaledForce = joystickForce / maxJoystickForce;
    //console.log("Normalización de Fuerza:", scaledForce);


    const currentDegree = myDegreeRef.current;
    const forceMultiplier = 10;

    // Convierte el ángulo a radianes
    const radians = (currentDegree * Math.PI) / 180;

    if (data?.direction?.y == "down") {
      y -= scaledForce * forceMultiplier * Math.cos(radians);
      x += scaledForce * forceMultiplier * Math.sin(radians);
    } else {
      x -= scaledForce * forceMultiplier * Math.sin(radians);
      y += scaledForce * forceMultiplier * Math.cos(radians);
    }
    setPosition({ x, y });
  };

  const handleJoystickDataAngle = (data) => {
    const rotation = data.angle.degree;

    //console.log(data.angle.degree);
    setDegree(rotation);
    myDegreeRef.current = rotation;
  };

  return (
    <div>
      <div className="information">
        <p>X = {position.x.toFixed(0)}</p>
        <p>Y = {position.y.toFixed(0)}</p>
        <p>Degrees = {degree.toFixed(0)}</p>
      </div>
      <Robot x={position.x} y={position.y} angle={degree} />
      <div className="wrapperRobot">
        <div className="joystickStyle">
          <JoystickY onJoystickMove={handleJoystickData} />
          <JoystickAngle onJoystickMove2={handleJoystickDataAngle} />
        </div>
      </div>
    </div>
  );
};

export default Home;
