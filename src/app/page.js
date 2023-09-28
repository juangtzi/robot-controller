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

// import Room from "../components/Room";
//import NormalJoystick from "@/components/NormalJoystick";
//import AngleJoystick from "@/components/AngleJoystick";

const Home = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const [degree, setDegree] = useState(0);
  const myDegreeRef = useRef(degree);

  let { x, y } = position;

  const handleJoystickData = (data) => {
    //console.log("Grados:", myDegreeRef.current);
    //console.log(data);

    let maxJoystickForce = 1;

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


    // Definir los límites de la habitación
    const minX = 0; // Valor mínimo de la coordenada x
    const maxX = 350; // Valor máximo de la coordenada x
    const minY = 0; // Valor mínimo de la coordenada y
    const maxY = 480; // Valor máximo de la coordenada y

    // Obtener las coordenadas actuales del objeto
    const currentX = x;
    const currentY = y;

    if (data?.direction?.y == "up") {
      const newY = currentY - scaledForce * forceMultiplier * Math.cos(radians);
      const newX = currentX + scaledForce * forceMultiplier * Math.sin(radians);

  // Verificar si las nuevas coordenadas están dentro de los límites
        if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
        // Solo actualizar las coordenadas si están dentro de los límites
              x = newX;
              y = newY;
  }
    } else {
      const newX  = currentX - scaledForce * forceMultiplier * Math.sin(radians);
      const newY = currentY + scaledForce * forceMultiplier * Math.cos(radians);

      // Verificar si las nuevas coordenadas están dentro de los límites
         if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
        // Solo actualizar las coordenadas si están dentro de los límites
            x = newX;
            y = newY;
  }
    }
    setPosition({ x, y });
    
  };

  const handleJoystickDataAngle = (data) => {
    const rotation = data;

    //console.log(data.angle.degree);
    setDegree(rotation);
    myDegreeRef.current = rotation;
  };


  return (
    <div>
      <div className="information">
        <p>X = {position.x?.toFixed(0)}</p>
        <p>Y = {position.y?.toFixed(0)}</p>
        <p>Degrees = {degree?.toFixed(0)}</p>
      </div>
      <div className="room">
       {/* <div className="carga"></div> */}
       
        <Robot x={position.x} y={position.y} angle={degree} />
      </div>
      
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
