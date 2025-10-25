# open cv 

import cv2
import os
import mediapipe as mp

hands_mp = mp.solutions.hands # create hand recognition algorithm object
hands = hands_mp.Hands() #
mp_draw = mp.solutions.drawing_utils # draw detected points 

