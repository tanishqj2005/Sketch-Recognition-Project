import React, { useState, useRef, useEffect, useCallback } from "react";
import Loader from "react-loader-spinner";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  const cvsRef = useRef();
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const isEraserMode = useRef(false);
  const lastX = useRef(0);
  const [isEraser, setIsEraser] = useState(false);
  const lastY = useRef(0);
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setisPredicting] = useState(false);

  const [dateUrl, setDataUrl] = useState("#");

  useEffect(() => {
    setCtx(cvsRef?.current?.getContext("2d"));
  }, [cvsRef, ctx]);

  const handleMouseDown = useCallback((e) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleClear = useCallback(() => {
    if (!ctx || !cvsRef || !cvsRef.current) {
      return;
    }
    ctx.clearRect(0, 0, cvsRef.current.width, cvsRef.current.height);
    setPrediction(null);
    setHasDrawn(false);
  }, [cvsRef, ctx]);

  const handleDownload = useCallback(() => {
    if (!cvsRef || !cvsRef.current) return;

    setDataUrl(cvsRef.current.toDataURL("image/png"));
  }, [cvsRef]);

  const drawOnCanvas = useCallback(
    (event) => {
      if (!ctx) {
        return;
      }
      ctx.beginPath();
      ctx.moveTo(lastX.current, lastY.current);
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      setHasDrawn(true);
      [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    },
    [ctx]
  );
  const handleEraserClicked = (e) => {
    if (isEraser) {
      return;
    }
    isEraserMode.current = true;
    setIsEraser(true);
  };
  const handleBrushClicked = (e) => {
    if (!isEraser) {
      return;
    }
    isEraserMode.current = false;
    setIsEraser(false);
  };
  const predictClicked = async () => {
    if (!hasDrawn) {
      return;
    }
    const sendValue = cvsRef.current.toDataURL();
    setisPredicting(true);
    const url = "https://prmlproject1.herokuapp.com/predict";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagestring: sendValue,
      }),
    });
    const respData = await response.json();
    setPrediction(respData["predictedclass"]);
    setisPredicting(false);
  };

  const drawNormal = useCallback(
    (e) => {
      if (!isDrawing.current || !ctx) return;
      if (isEraserMode.current) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 6;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 2.05;
      }
      drawOnCanvas(e);
    },
    [drawOnCanvas, ctx, isDrawing]
  );

  useEffect(() => {
    if (cvsRef && cvsRef.current && ctx) {
      cvsRef.current.addEventListener("mousedown", handleMouseDown);
      cvsRef.current.addEventListener("mousemove", drawNormal);
      cvsRef.current.addEventListener("mouseup", stopDrawing);
      cvsRef.current.addEventListener("mouseout", stopDrawing);

      cvsRef.current.width = 640;
      cvsRef.current.height = 480;

      ctx.strokeStyle = "#000";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2.05;
    }
  }, [cvsRef, ctx, drawNormal, handleMouseDown, stopDrawing]);

  var returnStyle = {
    backgroundColor: "#eee",
    padding: 0,
  };

  if (prediction) {
    returnStyle = { backgroundColor: "#eee", padding: 0 };
  }

  var predictionDiv = null;

  if (isPredicting) {
    predictionDiv = (
      <div
        style={{
          height: 100,
          width: window.innerWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: 10,
        }}
      >
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
    );
  } else if (!isPredicting && prediction) {
    predictionDiv = (
      <div
        style={{
          height: 100,
          width: window.innerWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: 10,
        }}
      >
        <div>
          <text
            style={{ color: "purple", fontFamily: "cursive", fontSize: 30 }}
          >
            We think that the sketch you have drawn is a:
          </text>
        </div>
        <div
          style={{
            padding: 15,
            marginRight: 10,
            marginLeft: 20,
            borderRadius: 20,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <text style={{ color: "white", fontFamily: "cursive", fontSize: 27 }}>
            {prediction}
          </text>
        </div>
      </div>
    );
  }

  return (
    <div style={returnStyle}>
      <div
        style={{
          width: "100%",
          paddingTop: 10,
          paddingBottom: 10,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 30,
            fontWeight: 200,
            marginBottom: 10,
            fontFamily: "cursive",
          }}
        >
          Welcome to our <text style={{ color: "#710eab" }}>Canvas</text>
        </p>
      </div>
      <div>
        <Canvas cvsRef={cvsRef} />
      </div>
      <div style={{ marginTop: 20, padding: 5 }}>
        <nav>
          <ul>
            <li>
              <a
                style={{ cursor: "pointer", textDecoration: "none" }}
                download="image.png"
                onClick={handleDownload}
                href={dateUrl}
              >
                Save Image
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </a>
            </li>
            <li onClick={handleClear} style={{ cursor: "pointer" }}>
              Clear
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li onClick={predictClicked} style={{ cursor: "pointer" }}>
              Predict
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li
              onClick={handleEraserClicked}
              style={{
                cursor: !isEraser ? "pointer" : "not-allowed",
                border: isEraser
                  ? "0.3em solid maroon"
                  : "0.3em solid goldenrod",
              }}
            >
              Eraser
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li
              onClick={handleBrushClicked}
              style={{
                cursor: isEraser ? "pointer" : "not-allowed",
                border: !isEraser
                  ? "0.3em solid maroon"
                  : "0.3em solid goldenrod",
              }}
            >
              Brush
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
        </nav>
      </div>
      <div>{predictionDiv}</div>
      <div
        style={{
          width: window.innerWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <text style={{ color: "red", fontFamily: "cursive", fontSize: 35 }}>
          About Us
        </text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <p style={{ color: "black", fontFamily: "cursive", fontSize: 26 }}>
          This project is created and maintained by a group of three students
          from Indian Institute of Technology, Jodhpur.
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <p style={{ color: "black", fontFamily: "cursive", fontSize: 26 }}>
          We are:
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <p style={{ color: "#d44f0d", fontFamily: "cursive", fontSize: 26 }}>
          1. Tanishq Joshi, B Tech in EE, IIT Jodhpur.
        </p>
        <p style={{ color: "#d44f0d", fontFamily: "cursive", fontSize: 26 }}>
          2. Suyash Singh, B Tech in EE, IIT Jodhpur.
        </p>
        <p style={{ color: "#d44f0d", fontFamily: "cursive", fontSize: 26 }}>
          3. Shyam Sundar Meena, B Tech in EE, IIT Jodhpur.
        </p>
        <hr />
        <hr />
        <hr />
        <p style={{ color: "black", fontFamily: "cursive", fontSize: 26 }}>
          This project was created as a part of the Pattern Recognition and
          Machine Learning Course in Semester 4.
        </p>
      </div>
      <div
        style={{
          width: window.innerWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <text style={{ color: "red", fontFamily: "cursive", fontSize: 35 }}>
          Predicted Classes
        </text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <p style={{ color: "black", fontFamily: "cursive", fontSize: 24 }}>
          We predict 30 classes of sketches as of now. These include:
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <p style={{ color: "green", fontFamily: "cursive", fontSize: 23 }}>
          1. bicycle 2. couch 3. blimp 4. knife 5. banana 6. pineapple
        </p>
        <p style={{ color: "green", fontFamily: "cursive", fontSize: 23 }}>
          7. pretzel 8. castle 9. trumpet 10. flower 11. church 12. hourglass
        </p>
        <p style={{ color: "green", fontFamily: "cursive", fontSize: 23 }}>
          13. hat 14. fan 15. spoon 16. umbrella 17. skyscraper 18. bench
        </p>
        <p style={{ color: "green", fontFamily: "cursive", fontSize: 23 }}>
          17. saw 18. car_(sedan) 19. shoe 20. hamburger 21. hammer 22.
          hot-air_balloon
        </p>
        <p style={{ color: "green", fontFamily: "cursive", fontSize: 23 }}>
          25. hotdog 26. eyeglasses 27. helicopter 28. harp 29. geyser 30.
          mushroom
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <p style={{ color: "black", fontFamily: "cursive", fontSize: 26 }}>
          We hope that you enjoy our little creation 😁.
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <p style={{ color: "black", fontFamily: "cursive", fontSize: 24 }}>
          You can ping us at{" "}
          <a style={{ color: "blue" }}>prmlproject1@gmail.com</a> for feedback.
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    </div>
  );
}

export default App;
