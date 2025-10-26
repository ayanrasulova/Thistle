import React from "react";
import "../App.css";

function LaunchCanvas() {
  return (
    <div className="launch-container">
      <div className="workspace">
        {/* Left section: Canvas */}
        <div className="canvas-section">
          <div className="canvas-placeholder">
            <p>🎨 Drawing Canvas Placeholder</p>
          </div>
        </div>

        {/* Right section: Webcam ABOVE controls */}
        <div className="right-panel">
          <div className="webcam-placeholder">
            <p>📷 Webcam Feed</p>
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

            <button className="action-btn">Clear Canvas</button>
            <button className="action-btn">Save Drawing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaunchCanvas;
