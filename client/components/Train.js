import { render } from "enzyme";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import app from "../../public";

const Train = () => {
  return (
    <div>
      <button onClick={() => app()}>Train</button>
      <button id="class-a">Add A</button>
      <button id="class-b">Add B</button>
      <button id="class-c">Add C</button>
    </div>
  );
};
export default Train;
