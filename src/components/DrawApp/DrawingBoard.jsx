import React, { useRef, useEffect, useState } from "react";

export default function DrawingBoard({
  strokeColor,
  lineWidth,
  eraseMode,
  clearSignal,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const socketRef = useRef(null);
  const isRemoteDraw = useRef(false); // prevents recursion between local & remote draw events

  // Initialize WebSocket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:6789");
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected ヽ(´▽`)/");
    socket.onclose = () => console.log("WebSocket disconnected (◎_◎;)");
    socket.onerror = (err) => console.error("o(╥﹏╥)o WebSocket error:", err);

    socket.onmessage = (event) => {
      try {
        const { x, y, shape } = JSON.parse(event.data);
        handleRemoteMessage(x, y, shape);
      } catch (err) {
        console.error("╰༼ •̀۝•́ ༽╯ Bad message:", event.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  // Setup canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 100; // space for toolbar
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  // Reactively update drawing settings
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = eraseMode ? "#ffffff" : strokeColor;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [strokeColor, lineWidth, eraseMode]);

  // React to clear button
  useEffect(() => {
    if (clearSignal && ctxRef.current) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  }, [clearSignal]);

  // Handle incoming messages from WebSocket
  const handleRemoteMessage = (x, y, shape) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const posX = x * canvas.width;
    const posY = y * canvas.height;

    // Transition from painting to not painting 
    if (isPainting && shape != "draw"){
        endPaint();
    }

    if (shape === "draw") {
      if (!isPainting) {
        isRemoteDraw.current = true;
        ctx.beginPath();
        ctx.moveTo(posX, posY);
      }
      ctx.lineTo(posX, posY);
      ctx.stroke();
    } else if (shape === "swipe") {
      // Placeholder for other gestures
    }
  };

  //  Local drawing events
  const startPaint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStart({ x, y });
    setIsPainting(true);
  };

  const paint = (e) => {
    if (!isPainting || !ctxRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    setStart({ x, y });

    // Send normalized coords to WebSocket (0–1)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          x: x / canvasRef.current.width,
          y: y / canvasRef.current.height,
          shape: "draw",
        })
      );
    }
  };

  const endPaint = () => {
    setIsPainting(false);
    if (eraseMode) {
      ctxRef.current.strokeStyle = strokeColor; // reset after erase
    }
  };

  return (
    <div className="drawing-board">
      <canvas
        ref={canvasRef}
        onMouseDown={startPaint}
        onMouseMove={paint}
        onMouseUp={endPaint}
      />
    </div>
  );
}
