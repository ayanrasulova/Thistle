import React from "react";

export default function Toolbar({ strokeColor, lineWidth, setStrokeColor, setLineWidth, clearCanvas, enableErase }) {
  return (
    <div id="toolbar" className="flex flex-col p-2 w-[70px] bg-[#202020] text-white">
      <h1 className="text-lg font-bold mb-2 bg-gradient-to-r from-[#91EAE4] via-[#86A8E7] to-[#7F7FD5] bg-clip-text text-transparent">
        Draw
      </h1>
      <label htmlFor="stroke" className="text-xs mb-1">Stroke</label>
      <input
        id="stroke"
        type="color"
        value={strokeColor}
        onChange={(e) => setStrokeColor(e.target.value)}
        className="mb-2"
      />

      <label htmlFor="lineWidth" className="text-xs mb-1">Line Width</label>
      <input
        id="lineWidth"
        type="range"
        min="1"
        max="50"
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
        className="mb-2"
      />

      <button onClick={clearCanvas} className="bg-[#1565C0] rounded text-white mb-2 p-1 text-sm">Clear</button>
      <button onClick={enableErase} className="bg-[#1565C0] rounded text-white p-1 text-sm">Erase</button>
    </div>
  );
}
