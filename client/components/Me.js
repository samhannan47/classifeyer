import React, { useEffect } from "react";
import { ppa } from "../../public/index.js";
import history from "../history";

const Me = () => {
  useEffect(() => {
    //this works but doesnt turn of camera led
    // var webcam = document.getElementById("webcam");
    // webcam.pause();
    // webcam.srcObject = null;
  }, []);

  return <div>PLACEHOLDER</div>;
};
export default Me;
