import React, { useState, useRef, useEffect, useCallback } from "react";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  const cvsRef = useRef();
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const [dateUrl, setDataUrl] = useState("#");

  useEffect(() => {
    setCtx(cvsRef?.current?.getContext("2d"));
  }, [cvsRef, ctx]);

  const handleMouseDown = useCallback((e) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
    console.log("Mouse Down");
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleClear = useCallback(() => {
    if (!ctx || !cvsRef || !cvsRef.current) {
      return;
    }
    ctx.clearRect(0, 0, cvsRef.current.width, cvsRef.current.height);
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
      [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    },
    [ctx]
  );

  const drawNormal = useCallback(
    (e) => {
      if (!isDrawing.current || !ctx) return;
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

      cvsRef.current.width = window.innerWidth - 200;
      cvsRef.current.height = window.innerHeight - 100;

      ctx.strokeStyle = "#000";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
    }
  }, [cvsRef, ctx]);

  return (
    <div style={{ backgroundColor: "#eee", padding: 0 }}>
      <div
        style={{
          width: "100%",
          paddingTop: 20,
          paddingBottom: 20,
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
      <div style={{ marginTop: 20, paddingBottom: 20 }}>
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
            <li style={{ cursor: "pointer" }}>
              Predict
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li onClick={handleClear} style={{ cursor: "pointer" }}>
              Clear
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
