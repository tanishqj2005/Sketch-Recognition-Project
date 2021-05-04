import React, { useState, useRef, useEffect, useCallback } from "react";
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
  // const [prediction, setPrediction] = useState("car");
  const [prediction, setPrediction] = useState(null);

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
    const url = "http://192.168.0.4:3333/predict";
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
    height: window.innerHeight,
  };

  if (prediction) {
    returnStyle = { backgroundColor: "#eee", padding: 0 };
  }

  const predictionDiv = prediction ? (
    <div
      style={{
        height: 100,
        width: window.innerWidth,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom:10,
      }}
    >
      <div>
        <text style={{ color: "black", fontFamily: "cursive", fontSize: 25 }}>
          The Prediction is:
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
        <text style={{ color: "white", fontFamily: "cursive", fontSize: 25 }}>
          {prediction}
        </text>
      </div>
    </div>
  ) : null;

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
        <p style={{ fontSize: 30, fontWeight: 200, fontFamily: "cursive" }}>
          Welcome to our Canvas
        </p>
      </div>
      <div>
        <Canvas cvsRef={cvsRef} />
      </div>
      <div style={{ marginTop: 20, paddingBottom: 0 }}>
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
    </div>
  );
}

export default App;
