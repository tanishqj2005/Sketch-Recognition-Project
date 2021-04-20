import React, { useState, useRef, useEffect, useCallback } from "react";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  const cvsRef = useRef();
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);
  const lastX = useRef(0);
  const lastY = useRef(0);

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

      cvsRef.current.width = window.innerWidth - 296;
      cvsRef.current.height = window.innerHeight - 160;

      ctx.strokeStyle = "#000";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
    }
  }, [cvsRef, ctx]);

  return (
    <div>
      <div>
        <Canvas cvsRef={cvsRef} />
      </div>
      <div style={{ marginTop: 20 }}>
        <nav>
          <ul>
            <li>
              Save Image
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              Make Prediction
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li onClick={handleClear}>
              Clear Frame
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
