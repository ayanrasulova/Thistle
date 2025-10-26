import React, { useState } from "react";
import DrawingBoard from "../components/DrawingBoard";
import "../App.css";

function LaunchCanvas() {
  const [clearTrigger, setClearTrigger] = useState(false);

  const handleClearCanvas = () => {
    // Flip the boolean to trigger useEffect in DrawingBoard
    setClearTrigger((prev) => !prev);
  };

  return (
    <div className="launch-container">
      <div className="workspace">
        <div className="canvas-section">
          {/* Pass clearTrigger to DrawingBoard */}
          <DrawingBoard clearTrigger={clearTrigger} />
        </div>

        <div className="right-panel">
          <div className="webcam-placeholder">
            <img
              src="http://localhost:5000/video_feed"
              alt="Live Hand Tracking Feed"
              className="webcam-stream"
            />
          </div>

          <div className="control-panel">
            <h3>Controls</h3>

            <div className="control-group">
              <label>Color</label>
              <div className="color-options">
                <div className="color-swatch" style={{ background: "#9EFF6E" }} />
                <div className="color-swatch" style={{ background: "#8FD4CB" }} />
                <div className="color-swatch" style={{ background: "#F59E0B" }} />
                <div className="color-swatch" style={{ background: "#8B5CF6" }} />
              </div>
            </div>

            <div className="control-group">
              <label>Brush Size</label>
              <input type="range" min="1" max="20" defaultValue="5" />
            </div>

            {/* Clear button triggers the state toggle */}
            <button className="action-btn" onClick={handleClearCanvas}>
              Clear Canvas
            </button>

            <button className="action-btn">Save Drawing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaunchCanvas;
