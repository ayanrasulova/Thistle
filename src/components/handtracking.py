from flask import Flask, Response
from flask import jsonify
import cv2
import time
import mediapipe as mp
import json


# Import your existing gesture detection helpers
from handlandmarks import open_palm, motion_detect, swipe, point_up

app = Flask(__name__)

# media pipe initializing
mp_holistic = mp.solutions.holistic
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

mp_model = mp_holistic.Holistic(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

video = cv2.VideoCapture(0)
video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# initializing for the websocket
cursor_x = 0
cursor_y = 0
gesture = ""

data = {
    "x": cursor_x,
    "y": cursor_y,
    "gesture": gesture
}

# added everything to a function
def generate_frames():
    global cursor_x, cursor_y, gesture
    prev_time = 0

    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = mp_model.process(image)
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # draw landmarks
        mp_draw.draw_landmarks(
            image, results.right_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
        mp_draw.draw_landmarks(
            image, results.left_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)


        # checking which gesture 

        if results.right_hand_landmarks:
            if swipe(results.right_hand_landmarks):
                cv2.putText(image, "right hand: swipe", (10, 150),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "swipe"
            elif open_palm(results.right_hand_landmarks):
                cv2.putText(image, "right hand: open", (10, 150),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "open_palm"
            elif point_up(results.right_hand_landmarks):
                cv2.putText(image, "right hand: pointing up", (10, 150),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "point_up"
            else:
                cv2.putText(image, "right hand: other", (10, 150),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "other"
                
            index_tip = results.right_hand_landmarks.landmark[mp.solutions.hands.HandLandmark.INDEX_FINGER_TIP]
            cursor_x = int(index_tip.x * 640)  # convert from normalized to pixels
            cursor_y = int(index_tip.y * 480)

        if results.left_hand_landmarks:
            if swipe(results.left_hand_landmarks):
                cv2.putText(image, "left hand: swipe", (10, 200),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "swipe"
            elif open_palm(results.left_hand_landmarks):
                cv2.putText(image, "left hand: open", (10, 200),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "open_palm"
            elif point_up(results.left_hand_landmarks):
                cv2.putText(image, "left hand: pointing up", (10, 200),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "point_up"
            else:
                cv2.putText(image, "left hand: other", (10, 200),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                gesture = "other"

        # fps 
        current_time = time.time()
        
        fps = 1 / (current_time - prev_time) if prev_time else 0
        prev_time = current_time
        cv2.putText(image, f"{int(fps)} FPS", (10, 70),
        cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

        _, buffer = cv2.imencode('.jpg', image)
        frame_bytes = buffer.tobytes()


        data = {
            "gesture": gesture,
            "x": cursor_x,
            "y": cursor_y
        }
        
        with open("gesture_data.json", "w") as f: # W so it overwrites it, not appends 
            json.dump(data, f)

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/data")
def data():
    try:
        with open("gesture_data.json", "r") as f:
            data = json.load(f)
    except:
        data = {"gesture": "", "x": 0, "y": 0}
    return jsonify(data)

# run the server
if __name__ == '__main__':
    print("starting flask video server on http://localhost:5000/video_feed")
    app.run(host='0.0.0.0', port=5000)

