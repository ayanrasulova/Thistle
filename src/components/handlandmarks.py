import mediapipe as mp
import math # for swipe
import time # for swipe

mp_hands = mp.solutions.hands

_prev_x = None
_prev_time = time.time()

# palm is open
def open_palm(hand_landmarks):

    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y
    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y
    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].y
    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP].y
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP].y

    index_knuckle = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].y
    middle_knuckle = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].y
    ring_knuckle = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].y
    pinky_knuckle = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP].y

    # true if finger tips above thumb
    tip_above_thumb = index_tip < thumb_tip and middle_tip < thumb_tip and ring_tip < thumb_tip and pinky_tip < thumb_tip
    knuckle_below_tip = index_knuckle > index_tip and middle_knuckle > middle_tip and ring_knuckle > ring_tip and pinky_knuckle and pinky_tip

    return (tip_above_thumb and knuckle_below_tip)

# detecting motion
def motion_detect(hand_landmarks, min_speed=0.5):

    global _prev_x, _prev_time

    wrist_x = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x
    now = time.time()

    if _prev_x is None:
        _prev_x = wrist_x
        _prev_time = now
        return None

    dt = now - _prev_time
    dx = wrist_x - _prev_x

    if dt <= 0: # fix divide by zero error
        return None

    speed = abs(dx) / dt

    direction = None # defaults to none

    if speed > min_speed and abs(dx) > 0.05: # must move at least 5% of screen width.. can change this to adjust threshold
        direction = "right" if dx > 0 else "left"

    _prev_x = wrist_x # updating variables
    _prev_time = now

    return direction

# swiping
def swipe(hand_landmarks):
    if not open_palm(hand_landmarks): # has to have open palm
        return False

    direction = motion_detect(hand_landmarks)
    if direction == "left":
        return True
    elif direction == "right":
        return True
    
    return None

# mouse up
def point_up():
    pass

# mouse down
def point_up_thumb_out():
    pass

def fingers_crossed():
    pass

def thumbs_up():
    pass

def rockstar():
    pass
