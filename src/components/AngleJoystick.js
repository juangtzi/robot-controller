"use client";
import Nipple from "nipplejs";
import React, { useEffect } from "react";

function AngleJoystick({ onJoystickMove2 }) {
  useEffect(() => {
    const joystickContainer = document.getElementById("left");

    const joystick = Nipple.create({
      zone: joystickContainer,
      size: 120,
      multitouch: true,
      maxNumberOfNipples: 2,
      mode: "static",
      restJoystick: false,
      shape: "circle",
      // position: { top: 20, left: 20 },
      //position: { top: "600px", left: "600px" },
      dynamicPage: true,
      color: "black",
    });

    //let pos = {};
    let interval;
    let data2 = {};

    joystick.on("move", (evt, data) => {
      //console.log(data);
      //pos = data.position;
      //data2 = data.angle;
      data2 = (450 - data.angle.degree) % 360;
      //onJoystickMove(data);
      //console.log(data2);
    });

    joystick.on("start", () => {
      interval = setInterval(() => {
        //console.log(pos);
        onJoystickMove2(data2);
        //console.log(data2);
      }, 100);
    });
    joystick.on("end", () => {
      clearInterval(interval);
    });
  }, []);

  return (
    <div>
      <div id="left"></div>
    </div>
  );
}

export default AngleJoystick;
