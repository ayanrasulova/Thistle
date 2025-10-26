from flask import Flask, Response
from flask import jsonify
from flask_cors import CORS
import cv2
import time
import mediapipe as mp
import json


from handlandmarks import open_palm, swipe, point_thumb_in, point_thumb_out, rockstar, thumbs_up, fingers_crossed

app = Flask(__name__)
CORS(app) 

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

data = { # dictionary for json
    "x": cursor_x,
    "y": cursor_y,
    "gesture": gesture
}

# added everything to a function
def generate_frames():
    global cursor_x, cursor_y, gesture
    prev_time = 0

    with mp_holistic.Holistic(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    ) as holistic:

        while video.isOpened():
            ret, frame = video.read()
            if not ret:
                break

            frame = cv2.flip(frame, 1)
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = holistic.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # draw landmarks
            mp_draw.draw_landmarks(
                image, results.right_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
            mp_draw.draw_landmarks(
                image, results.left_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)


            # checking which gesture (also, right hand is actually left hand because canvas is flipped and vise versa)

            # initialize these for double swipe features
            right_swiped = False
            left_swiped = False

            # right hand
            if results.right_hand_landmarks:

                if swipe(results.right_hand_landmarks):
                    right_swiped = True
                    cv2.putText(image, "right hand: swipe", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "swipe"

                elif open_palm(results.right_hand_landmarks):
                    cv2.putText(image, "right hand: open palm", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "open_palm"

                elif rockstar(results.right_hand_landmarks):
                    cv2.putText(image, "right hand: rockstar", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "rockstar"
                
                elif thumbs_up(results.right_hand_landmarks):
                    cv2.putText(image, "right hand: thumbs up", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "thumbs up"

                elif fingers_crossed(results.right_hand_landmarks, "right"):
                    cv2.putText(image, "right hand: fingers crossed", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "fingers_crossed"

                elif point_thumb_in(results.right_hand_landmarks, "right"):
                    cv2.putText(image, "right hand: pointing - thumb in", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "point_thumb_in"

                elif point_thumb_out(results.right_hand_landmarks, "right"):
                    cv2.putText(image, "right hand: pointing - thumb out", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "point_thumb_out"

                else:
                    cv2.putText(image, "right hand: other", (10, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "other"
                    
                # cursor & index tip detection
                index_tip = results.right_hand_landmarks.landmark[mp.solutions.hands.HandLandmark.INDEX_FINGER_TIP]
                cursor_x = int(index_tip.x * 640)  # convert from normalized to pixels
                cursor_y = int(index_tip.y * 480)

            # left hand 
            if results.left_hand_landmarks:

                if swipe(results.left_hand_landmarks):
                    left_swiped = True
                    cv2.putText(image, "left hand: swipe", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "swipe"

                elif open_palm(results.left_hand_landmarks):
                    cv2.putText(image, "left hand: open palm", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "open_palm"

                elif rockstar(results.left_hand_landmarks):
                    cv2.putText(image, "left hand: rockstar", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "rockstar"

                elif thumbs_up(results.left_hand_landmarks):
                    cv2.putText(image, "left hand: thumbs up", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "thumbs up"
                
                elif fingers_crossed(results.left_hand_landmarks, "left"):
                    cv2.putText(image, "left hand: fingers crossed", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "fingers_crossed"

                elif point_thumb_in(results.left_hand_landmarks, "left"):
                    cv2.putText(image, "left hand: pointing - thumb in", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "point_thumb_in"

                elif point_thumb_out(results.left_hand_landmarks, "left"):
                    cv2.putText(image, "left hand: pointing - thumb out", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "point_thumb_out"

                else:
                    cv2.putText(image, "left hand: other", (10, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
                    gesture = "other"

                # cursor & index tip detection
                index_tip = results.left_hand_landmarks.landmark[mp.solutions.hands.HandLandmark.INDEX_FINGER_TIP]
                cursor_x = int(index_tip.x * 640)  # convert from normalized to pixels
                cursor_y = int(index_tip.y * 480)

            if left_swiped and right_swiped:
                cv2.putText(image, "DOUBLE SWIPE DETECTED!", (200, 400),
                cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 255), 3)
                gesture = "double_swipe"
                    
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
            
    video.release()
    cv2.destroyAllWindows()


# sending to video feed
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# updating json file
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

