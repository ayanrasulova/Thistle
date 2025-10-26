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

# double swipe (changed to this because its too easy to erase canvas)
def double_swipe(left_hand, right_hand):
    if left_hand is None or right_hand is None:
        return False
    
    left_swipe = swipe(left_hand)
    right_swipe = swipe(right_hand)

    # both must swipe in the same direction within the same frame
    if left_swipe and right_swipe:
        return True
    return False

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

def fingers_crossed(hand_landmarks, side):
    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]

    thumb_position_x = thumb_tip.x > middle_tip.x and thumb_tip.x > ring_tip.x and thumb_tip.x > pinky_tip.x and thumb_tip.x > index_tip.x
    index_position_x = index_tip.x < thumb_tip.x and index_tip.x > middle_tip.x and index_tip.x > ring_tip.x and index_tip.x > pinky_tip.x

    thumb_position_y = thumb_tip.y < middle_tip.y and thumb_tip.y < ring_tip.y 

    #if side = "right":
        
    #if side = "left":
        #return thumb_position_x and index_position_x
    

    pass

def thumbs_up(hand_landmarks):
    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]

    thumb_above = thumb_tip.y < index_tip.y and thumb_tip.y < pinky_tip.y and thumb_tip.y < ring_tip.y and thumb_tip.y < middle_tip.y

    return (thumb_above)

def rockstar(hand_landmarks):
    index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
    middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
    ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
    pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
    thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]

    index_above = index_tip.y < middle_tip.y and index_tip.y < ring_tip.y and index_tip.y < thumb_tip.y
    pinky_above = pinky_tip.y < middle_tip.y and pinky_tip.y < ring_tip.y and pinky_tip.y < thumb_tip.y
    middle_ring_below_thumb = middle_tip.y > thumb_tip.y and ring_tip.y > thumb_tip.y

    return index_above and pinky_above and middle_ring_below_thumb
