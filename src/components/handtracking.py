# open cv 

import cv2
import time
import os
import mediapipe as mp

holistic_mp = mp.solutions.holistic # holistic hand recognition algorithm 
mp_model = holistic_mp.Holistic(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

mp_draw = mp.solutions.drawing_utils # draw detected points 

video = cv2.VideoCapture(0) # we are using 1 webcam only, so argument = 0
video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

if not video.isOpened():
    print("video not opening, check webcam")
    exit()

previousTime = 0 #initialize for fps
while video.isOpened():
    ret, frame = video.read()# reads frame by frame    

    frame = cv2.flip(frame, 1) # flip for more intuitive view
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) # color conversion BGR to RGB

    # predictions made based on holistic model
    image.flags.writeable = False
    results = mp_model.process(image)
    image.flags.writeable = True

    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # color conversion back from RGB to BGR

    # facial key points (we will use hands for now but can also map to face.. commenting out for now)

    # mp_draw.draw_landmarks(
    #   image,
    #   results.face_landmarks,
    #   holistic_mp.FACEMESH_CONTOURS,
    #   mp_draw.DrawingSpec(
    #     color=(255,0,255),
    #     thickness=1,
    #     circle_radius=1
    #   ),
    #   mp_draw.DrawingSpec( 
    #     color=(0,255,255),
    #     thickness=1,
    #     circle_radius=1
    #   )
    # )

    # right hand key points
    mp_draw.draw_landmarks(
      image, 
      results.right_hand_landmarks, 
      mp.solutions.hands.HAND_CONNECTIONS
    )

    # left hand key points 
    mp_draw.draw_landmarks(
      image, 
      results.left_hand_landmarks, 
      mp.solutions.hands.HAND_CONNECTIONS
    )
    
    # time module to get frames per second, then display
    currentTime = time.time() 
    fps = 1 / (currentTime-previousTime)
    previousTime = currentTime
    cv2.putText(image, str(int(fps))+"FPS", (10, 70), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)

    # display img
    cv2.imshow("Facial and Hand Landmarks", image)

    if cv2.waitKey(5) & 0xFF == ord('q'): # exit with q, check bottom 8 bits
        break

    # Code to access landmarks
    for landmark in holistic_mp.HandLandmark:
        print(landmark, landmark.value)

print(holistic_mp.HandLandmark.WRIST.value)

# release vid and close windows when loop ends 
video.release()
cv2.destroyAllWindows() # end windows  
