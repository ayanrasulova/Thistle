import React from "react";

export default function Toolbar({
    strokeColor,
    onStrokeChange,
    lineWidth,
    onLineWidthChange,
    onClear,
    onEraseToggle,
}) {
    return (
        <div id="toolbar">
            <h1>Draw</h1>
            <label htmlFor="stroke">Stroke</label>
            <input
                id="stroke"
                type="color"
                value={strokeColor}
                onChange={(e) => onStrokeChange(e.target.value)}
            />
            <label htmlFor="lineWidth">Line Width</label>
            <input
                id="lineWidth"
                type="range"
                min="1"
                max="30"
                value={lineWidth}
                onChange={(e) => onLineWidthChange(e.target.value)}
            />
            <button onClick={onClear}>Clear</button>
            <button onClick={onEraseToggle}>Erase</button>
        </div>
    );
}