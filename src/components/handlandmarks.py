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

def pointer(hand_landmarks, side):
    # if point and thumb closer to middle tip than index knuckle, 
    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
    index_knuckle = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP]

    index_above_thumb = index_tip.y < thumb_tip.y and index_tip.y < index_knuckle.y
    fingers_below_index = middle_tip.y > thumb_tip.y and ring_tip.y > thumb_tip.y and pinky_tip.y > thumb_tip.y
    thumb_facing_in = thumb_tip.x > index_tip.x
    thumb_facing_out = thumb_tip.x < index_tip.x

    # reversed based on either left or right (right = left hand (since canvas is reversed))
    if side == "right":
        if (index_above_thumb and fingers_below_index and thumb_facing_out):
            return "point"
        elif (index_above_thumb and fingers_below_index and thumb_facing_in):
            return "draw"
        else:
            return False
        
    if side == "left":
        if (index_above_thumb and fingers_below_index and thumb_facing_in):
            return "point"
        elif (index_above_thumb and fingers_below_index and thumb_facing_out):
            return "draw"
        else:
            return False

def point_thumb_in(hand_landmarks, side):
    if pointer(hand_landmarks, side) == "point":
        return True
    else:
        return False
    
def point_thumb_out(hand_landmarks, side):
    if pointer(hand_landmarks, side) == "draw":
        return True
    else: 
        return False


# mouse up
# def point_up(hand_landmarks):
#     thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
#     index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
#     middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
#     ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
#     pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]

#     def dist(a, b): # distance between landmarks helper func
#         return math.hypot(a.x - b.x, a.y - b.y)
    
#     index_knuckle = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_MCP]
#     thumb_ip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP]

#     # true if finger tips above thumb
#     index_above_thumb = index_tip.y < thumb_tip.y and index_tip.y < index_knuckle.y
#     fingers_below_index = middle_tip.y > thumb_tip.y and ring_tip.y > thumb_tip.y and pinky_tip.y > thumb_tip.y

#     thumb_index_close = dist(thumb_tip, index_tip) < 0.07  # tweak threshold if needed
#     thumb_inline = abs(thumb_tip.x - index_knuckle.x) < 0.1

#     return (index_above_thumb and fingers_below_index and thumb_inline and thumb_index_close) # and thumb_in

# mouse down
def point_up_thumb_out():
    pass

def fingers_crossed():
    pass

def thumbs_up():
    pass

def rockstar():
    pass

def coordinates():
    pass