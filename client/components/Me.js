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
    loadInitialData();
  });

  const username = useSelector((state) => state.auth.username);
  const createdAt = useSelector((state) => state.auth.createdAt);
  const picture = useSelector((state) => state.auth.imageUrl);

  return (
    <div>
      <p>Hi, {username}</p>

      <p>Your account was created: {timeago.format(`${createdAt}`, "en_us")}</p>
      <img src={picture} />
    </div>
  );
};
export default Me;
