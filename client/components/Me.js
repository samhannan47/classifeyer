import React, { useEffect } from "react";
import history from "../history";
import { useSelector } from "react-redux";
import * as timeago from 'timeago.js';

const Me = () => {
  useEffect(() => {
    //this works but doesnt turn of camera led
    // var webcam = document.getElementById("webcam");
    // webcam.pause();
    // webcam.srcObject = null;
  }, []);

  const username = useSelector((state) => state.auth.username);
  const createdAt = useSelector((state) => state.auth.createdAt);



  return (<div>

    <span>Hi, {username}</span>

    <span>Your account was created: {timeago.format(`${createdAt}`, 'en_us')}</span>



  </div>);
};
export default Me;
