import cv2
import mediapipe as mp

# importing the requests library
import requests
import numpy as np
from IPython.display import display
import time
from exercises import *
from tolerance import *

mp_drawing_styles = mp.solutions.drawing_styles
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=1, circle_radius=1)


global cap, frame, switch, counter, capture, timer, error
switch = 1
cap = cv2.VideoCapture(0)
capture = 0
counter = 0
timer = 0
error = 0
params = {"counter": counter, "timer": timer, "error": error}


def generate_frames3():
    tol_angle = get_tolerance("mild")
    stage = None
    starttime = time.time()
    lasttime = starttime
    flag = None
    counter = 0
    timer = 0
    error = 0
    # curl counter variables


    t1 = t2 = time.time()
    curr_timer = time.time()
    threshtime = 4
    times = [0] * 4
    feedback = None
    rep_time = None
    min_angle = 180
    max_angle = 0

    cap = cv2.VideoCapture(0)
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()

            # Coloring BGR -> RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False

            # make detection
            results = pose.process(image)

            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) 

            # Extract Landmarks
            try:
                # Storing curr time
                curr_timer = time.time()

                landmarks = results.pose_landmarks.landmark

                # Get Coordinates
                left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
                left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                right_ankle = [landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]
                right_hip = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
                right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]

                # Calculate angle
                angle_left = calculate_angle(left_ankle, left_hip, left_shoulder)
                angle_right = calculate_angle(right_ankle, right_hip, right_shoulder)
                angle = 0.5 * (angle_left + angle_right)
                
                #Visualize angle
                cv2.putText(image, str(int(angle_left)), 
                            tuple(np.multiply(left_hip, [640, 480]).astype(int)), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                    )

                cv2.putText(image, str(int(angle_right)), 
                            tuple(np.multiply(right_hip, [640, 480]).astype(int)), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                    )
                
                
                
                if angle > 160 and (stage == None or stage == 'down'):
                    if stage == 'down':
                        t2 = time.time()
                        times[(counter-1)%4] = abs(t2-t1)
                        rep_time = abs(t2-t1)    
                    t1 = time.time()


                if angle > 160:
                    stage = 'up'
                    max_angle = max(angle, max_angle)

                if angle < 88 and stage == 'up':
                    stage = 'down'
                    counter += 1
                    min_angle = min(angle, min_angle)

                #print(counter)


            except:
                pass

            # Render curl counter
            # Setup status box
            cv2.rectangle(image, (0,0), (640,73), (245,117,16), -1)

            #Rep data
            cv2.putText(image, 'REPS', (15,12), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
            cv2.putText(image, str(counter), 
                        (10,60), 
                        cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)

            # Stage data
            cv2.putText(image, 'STAGE', (140,12), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
            cv2.putText(image, stage, 
                        (120,60), 
                        cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)



            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245,117,66), thickness=1, circle_radius=1), 
                                    mp_drawing.DrawingSpec(color=(245,66,230), thickness=1, circle_radius=1) 
                                    )  
            ret, buffer = cv2.imencode(".jpg", image)
            image = buffer.tobytes()

            if counter >= 1:
                params["counter"] = counter
                params["min"] = np.round(min_angle)
                params["max"] = np.round(max_angle)
                r = requests.get(url="http://127.0.0.1:5000/complete", params=params)

                    # if capture:
                    #     params["counter"] = counter
                    #     r = requests.get(url="http://127.0.0.1:5000/score", params=params)
                    #     break
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + image + b"\r\n")
