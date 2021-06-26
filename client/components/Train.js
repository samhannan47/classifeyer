import { render } from "enzyme";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import app from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let isTraining = 0;
let button1 = "Sam";
let button2 = "Dog";
let button3 = "Giraffe";
const classifier = knnClassifier.create();

const webcamElement = document.getElementById("webcam");
let net;

export async function app() {
  console.log("Loading mobilenet..");

  // Load the model.
  net = await mobilenet.load();
  console.log("Successfully loaded model");

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);

  // Reads an image from the webcam and associates it with a specific class
  // index.
  const addExample = async (classId) => {
    // Capture an image from the web camera.
    const img = await webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(img, true);

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  };

  // When clicking a button, add an example for that class.
  document
    .getElementById("class-a")
    .addEventListener("click", () => addExample(0));
  document
    .getElementById("class-b")
    .addEventListener("click", () => addExample(1));
  document
    .getElementById("class-c")
    .addEventListener("click", () => addExample(2));

  while (true) {
    if (classifier.getNumClasses() > 0) {
      const img = await webcam.capture();

      // Get the activation from mobilenet from the webcam.
      const activation = net.infer(img, "conv_preds");
      // Get the most likely class and confidence from the classifier module.
      const result = await classifier.predictClass(activation);

      const classes = [
        `${document.getElementById("class-a").innerHTML}`,
        `${document.getElementById("class-b").innerHTML}`,
        `${document.getElementById("class-c").innerHTML}`,
      ];
      document.getElementById("console").innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
      `;

      // Dispose the tensor to release the memory.
      img.dispose();
    }

    await tf.nextFrame();
  }
}

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
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let name = evt.target.name.value;
    let value = document.getElementById("selector").value;
    console.log(typeof value);
    if (Number(value) === 1) {
      document.getElementById("class-a").innerHTML = `${name}`;
    }
    if (Number(value) === 2) {
      document.getElementById("class-b").innerHTML = `${name}`;
    }
    if (Number(value) === 3) {
      document.getElementById("class-c").innerHTML = `${name}`;
    }
  };

  const editButton = (id) => {
    let btn = document.getElementById(id);
    btn.innerHTML = handleSubmit();
    console.log();
  };
  return (
    <div id="trainer">
      <button
        onClick={() => {
          app();
          sum();
        }}
      >
        Train
      </button>
      <button id="class-a" onClick={() => handleClick()}>
        {button1}
      </button>
      <button id="class-b" onClick={() => handleClick()}>
        {button2}
      </button>
      <button id="class-c" onClick={() => handleClick()}>
        {button3}
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
      <span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <small>update your model here</small>
          </label>
          <input name="name" type="text" />
          <button type="submit">Submit</button>
        </form>
        <select id="selector" onSelect={handleSubmit}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </span>
    </div>
  );
};
export default Train;
