import mediapipe as mp

mp_hands = mp.solutions.hands

def open_palm(hand_landmarks):

    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y
    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y
    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].y
    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].y
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].y

    # true if finger tips above thumb
    return (index_tip < thumb_tip and middle_tip < thumb_tip and 
        ring_tip < thumb_tip and pinky_tip < thumb_tip)

def motion_detector(): 

    pass

def swipe():
    return open_palm and motion_detector

# mouse up
def point_up():
    pass

# mouse down
def point_up_thumb_out():
    pass