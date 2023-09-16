"use client";
import Nipple from "nipplejs";
import React, { useEffect } from "react";

function NormalJoystick({ onJoystickMove }) {
  useEffect(() => {
    const joystickContainer = document.getElementById("right");

    const joystick = Nipple.create({
      zone: joystickContainer,
      size: 120,
      multitouch: true,
      maxNumberOfNipples: 2,
      mode: "static",
      restJoystick: true,
      shape: "circle",
      // position: { top: 20, left: 20 },
      //position: { top: "600px", left: "60px" },
      dynamicPage: true,
      color: "black",
      lockY: true,
    });

    let pos = {};
    let interval;
    let data2 = {};

    joystick.on("move", (evt, data) => {
      //console.log(data);
      pos = data.position;
      //data2 = data.angle;
      data2 = data;
      //onJoystickMove(data);
    });

    joystick.on("start", () => {
      interval = setInterval(() => {
        console.log();
        onJoystickMove(data2);
        //console.log(data2);
      }, 100);
    });
    joystick.on("end", () => {
      clearInterval(interval);
    });
  }, []);

  return (
    <div>
      <div id="right"></div>
    </div>
  );
}

export default NormalJoystick;
