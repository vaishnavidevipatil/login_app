import cv2
import os
import time
from flask import Flask, jsonify, Response

app= Flask(__name__)

save_directory= r"C:\Users\vaish\code\LLM\vcam"

os.makedirs(save_directory, exist_ok=True)
cap= cv2.VideoCapture(0)

if not cap.isOpened():
    print("Cannot open camera")
    exit()
    
print("Connected to webcam.")
cv2.namedWindow('Live feed', cv2.WINDOW_NORMAL)  # Correct function name


def generate_frames():
    """ Stream frames for live feed. """
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')



@app.route('/start_camera', methods=['POST'])
def start_camera():
    """ Starts the camera feed. """
    global cap
    if cap is None or not cap.isOpened():
        cap = cv2.VideoCapture(0) 
        return jsonify({"message": "Camera started"}), 200
    return jsonify({"message": "Camera is already running"}), 400

@app.route('/stop_camera', methods=['POST'])
def stop_camera():
    global cap
    
    if cap is not None:
        cap.release()
        cap = None
        return jsonify({"message": "Camera stopped"}), 200
    
    return jsonify({"message": "Camera is already off"}), 400

@app.route('/live_feed')
def live_feed():
    """ Returns a live video feed to be embedded in React frontend. """
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/capture', methods=['POST'])
def capture():
    """ Captures a single frame and saves it. """
    ret, frame = cap.read()
    
    if not ret:
        return jsonify({"error": "Failed to capture frame"}), 500

    frame_filename = os.path.join(save_directory, f'frame_{int(time.time())}.jpg')
    cv2.imwrite(frame_filename, frame)

    return jsonify({"message": "Frame captured", "path": frame_filename}), 200


if __name__ == '__main__':
    app.run(debug=True,port=5000, host="0.0.0.0")
    
    
cap.release()
cv2.destoryAllWindows()    
    