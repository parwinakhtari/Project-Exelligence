import cv2
import mediapipe as mp

# importing the requests library
import requests
import numpy as np
from IPython.display import display
import time
from playsound import playsound
from tolerance import *
from helper import *
from ElbowFlexion import *

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose



def generate_frames1(hand = 'left', severity = 'low', expertime = 2.5):
    
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose

    cap = cv2.VideoCapture(0)

    params = {
        'counter' : 0,
        'stage' : None,
        't1' : time.time(),
        't2' : time.time(),
        'curr_timer' : time.time(),
        'threshtime' : 2.5,
        'times' : [0] * 4,
        'feedback' : None,
        'rep_time' : None,
        'name' : None,
        'error_timer' : None,
        'error_flag' : False,
        'play_box' : False,
        'box_timer':None,
        'n_reps' : 4,
        'error' : 0,
        'rep_time_list': [],
        'max_angle' : 0,
        'min_angle' : 180
    }

    ## Setup mediapipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            
            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
        
            # Make detection
            results = pose.process(image)
        
            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            # get_bounding box
            bounding_box = get_bounding_box(image)
            
            # Extract landmarks
            try:
                landmarks = results.pose_landmarks.landmark
                
                # Storing curr time
                params['curr_timer'] = time.time()
                
                # evaluate flag
                flag = evaluate_flag(landmarks, bounding_box)
                
                # add bounding box
                image = add_bounding_box(image, flag = flag)
                
                # add information bar
                image = add_info(image, flag, params)
                
                # elbow Flexion
                # This function is only called when flag == in
                if flag == 'in':
                    params['inside'] = True
                    print("Pehla")
                    image, params = elbowFlexion(image, landmarks, params)
                    print("Baad")
                    image = add_feedback(image, params)
                else:
                    params['inside'] = False
                
            except:
                image = add_bounding_box(image, flag = 'out')
                image = add_info(image, 'out', params)
            
            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=1), 
                                    mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=1) 
                                    )               
            
        

            ret, buffer = cv2.imencode(".jpg", image)
            image = buffer.tobytes()

            if params['counter'] >= 1:
                tim = time.time()
                params["timer"] = 0
                r = requests.get(url="http://127.0.0.1:8000/score", params=params)

            # if capture:
            #     params["counter"] = counter
            #     r = requests.get(url="http://127.0.0.1:5000/score", params=params)
            #     break
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + image + b"\r\n")
