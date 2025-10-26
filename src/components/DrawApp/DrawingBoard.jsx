import React, { useEffect, useRef, useState } from "react";

export default function DrawingBoard({ strokeColor, lineWidth, isErasing, setIsErasing, clearTrigger }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [pastShape, setPastShape] = useState("");
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 70; // account for toolbar width
    canvas.height = window.innerHeight;
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  // Update stroke settings when props change
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = isErasing ? "#fff" : strokeColor;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [strokeColor, lineWidth, isErasing]);

  // Handle clear button trigger
  useEffect(() => {
    if (clearTrigger && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [clearTrigger]);

  // Poll gesture JSON every 100ms
  useEffect(() => {
    const interval = setInterval(checkGestureData, 100);
    return () => clearInterval(interval);
  }, [lastData, pastShape]);

  async function checkGestureData() {
    try {
      const res = await fetch("http://localhost:3000/gesture_data.json", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();

      if (JSON.stringify(data) !== JSON.stringify(lastData)) {
        setLastData(data);
        handleJsonChange(data);
      }
    } catch (err) {
      console.error("Failed to fetch gesture data:", err);
    }
  }

  function handleJsonChange(newData) {
    const { gesture, x, y } = newData;
    if (!gesture || !ctxRef.current) return;

    const shape = gesture.toLowerCase();
    const ctx = ctxRef.current;

    if (shape === "swipe") {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setPastShape("swipe");
      return;
    }

    if (shape === "point_thumb_out") {
      if (pastShape === "point_thumb_out") {
        if (!isPainting) setIsPainting(true);
        else {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsPainting(true);
      }
      setPastShape("point_thumb_out");
    } else {
      if (pastShape === "point_thumb_out" || pastShape === "rockstar") {
        setIsPainting(false);
        ctx.stroke();
        ctx.beginPath();
        if (isErasing) {
          setIsErasing(false);
          ctx.strokeStyle = strokeColor;
        }
      }
      setPastShape(shape);
    }
  }

  // Manual mouse drawing
  const handleMouseDown = (e) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsPainting(true);
  };

  const handleMouseMove = (e) => {
    if (!isPainting) return;
    const ctx = ctxRef.current;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsPainting(false);
    ctxRef.current.beginPath();
    if (isErasing) {
      setIsErasing(false);
      ctxRef.current.strokeStyle = strokeColor;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id="drawing-board"
      className="bg-white flex-1"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
