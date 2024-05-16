import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { BarcodeDetector } from "barcode-detector/pure";
import { drawRect } from "./utilities";

function App() {
  const [data, setData] = useState("");
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const barcodeDetect = async () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const barcodeDetector = new BarcodeDetector();
    const code = await barcodeDetector.detect(imageData);
    if (code) {
      console.log(code);
      drawRect(code, context);
    }
  };

  useEffect(() => {
    setInterval(() => {
      barcodeDetect();
    }, 100);
  }, []);
  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <p>{data}</p>
    </div>
  );
}

export default App;
