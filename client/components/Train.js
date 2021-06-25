import { render } from "enzyme";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import app from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let isTraining = 0;
const Train = () => {
  const notify = () =>
    toast.warn("you need to start training!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const sum = () => {
    isTraining = isTraining + 1;
  };

  const handleClick = () => {
    if (isTraining === 0) {
      notify();
    }
  };

  const createButton = () => {
    let btn = document.createElement("BUTTON");
    btn.innerHTML = "new option";
    btn.id = "class-d";
    btn.addEventListener("click", () => addExample(3));
    document.body.appendChild(btn);
  };
  return (
    <div>
      <button
        onClick={() => {
          app();
          sum();
        }}
      >
        Train
      </button>
      <button id="class-a" onClick={() => handleClick()}>
        Add A
      </button>
      <button id="class-b" onClick={() => handleClick()}>
        Add B
      </button>
      <button id="class-c" onClick={() => handleClick()}>
        Add C
      </button>
      <button type="button" onClick={() => createButton()}>
        me
      </button>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Train;
