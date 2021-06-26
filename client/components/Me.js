import React, { useEffect } from "react";
import history from "../history";
import { useSelector, useDispatch } from "react-redux";
import * as timeago from "timeago.js";
import { me } from "../store";
const Me = () => {
  const dispatch = useDispatch();
  const loadInitialData = () => {
    dispatch(me());
  };

  useEffect(() => {
    console.log("hit");
    loadInitialData();
  });

  const username = useSelector((state) => state.auth.username);
  const createdAt = useSelector((state) => state.auth.createdAt);
  const picture = useSelector((state) => state.auth.imageUrl);

  return (
    <div>
      <span>Hi, {username}</span>

      <span>
        Your account was created: {timeago.format(`${createdAt}`, "en_us")}
      </span>
      <img src={picture} />
    </div>
  );
};
export default Me;
