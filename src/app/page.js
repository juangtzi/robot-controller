"use client";
import React, { useState } from 'react';
import Room from '../components/Room';
import Robot from '../components/Robot';
import Joystick from '../components/Joystick';

const Home = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const roomWidth = 400;
  const roomHeight = 400;
  const robotSize = 10;
  const robotSpeed = 1;

  const handleMoveRobot = (direction) => {
    // Copia la posición actual para modificarla
    let { x, y } = position;

    // Calcula la nueva posición en función de la dirección
    switch (direction) {
      case "FORWARD":
        y = Math.max(0, y - robotSpeed);
        break;
      case "BACKWARD":
        y = Math.min(roomHeight - robotSize, y + robotSpeed);
        break;
      case "LEFT":
        x = Math.max(0, x - robotSpeed);
        break;
      case "RIGHT":
        x = Math.min(roomWidth - robotSize, x + robotSpeed);
        break;
      default:
        break;
    }

    // Actualiza la posición del robot
    setPosition({ x, y });
    console.log(position);

    // Enviar la nueva posición (x, y) al servidor
  };

  return (
    <div>
      <Room />
      <div className="information">
        <p>X = {position.x}</p>
        <p>Y = {position.y}</p>
      </div>
      <Robot x={position.x} y={position.y} />
      <Joystick onMove={handleMoveRobot} />
    </div>
  );
};

export default Home;