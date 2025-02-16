import React, { useState } from "react";

const LiveFeed= () => {

    const [cameraOn, setCameraOn] = useState(false);
    const [captureMessage, setCaptureMessage]= useState('')



    const handleStartCamera = async () => {
        try {
          const response = await fetch("http://localhost:5000/start_camera", {
            method: "POST",
          });
          const data = await response.json();
          setCameraOn(true);
          console.log(data.message);
        } catch (error) {
          console.error("Error starting camera:", error);
        }
      };

      const handleStopCamera = async () => {
        try {
          const response = await fetch("http://localhost:5000/stop_camera", {
            method: "POST",
          });
          const data = await response.json();
          setCameraOn(false);
          console.log(data.message);
        } catch (error) {
          console.error("Error stopping camera:", error);
        }
      };

    const handleCapture=async()=>{
    try {
        const response = await fetch("http://localhost:5000/capture", {
            method: "POST",
        });
        const data = await response.json();
        setCaptureMessage(data.message);
        } catch (error) {
            setCaptureMessage("Error capturing frame");
    }
};

return (
    <div>
       <h2>Live Camera Feed</h2>
            {cameraOn ? (
        <img
          src="http://localhost:5000/live_feed"
          alt="Live Feed"
          style={{ width: "600px", height: "400px", border: "2px solid black" }}
        />
      ) : (
        <p>Camera is off. Click "Start Camera" to enable.</p>
      )}
      <br />
      <button onClick={handleStartCamera} style={{ margin: "10px" }}>
        Start Camera
      </button>


      <button onClick={handleStopCamera} style={{ margin: "10px" }}>
        Stop Camera
      </button>

      <button onClick={handleCapture} style={{ marginTop: "10px" }} disabled={!cameraOn}>
        Capture Frame
      </button>
      {captureMessage && <p>{captureMessage}</p>}
    </div>
  
);
};

export default LiveFeed;

