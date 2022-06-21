from flask import Flask, render_template, Response, request, jsonify, url_for
import json
import requests
import urllib.request

import cv2
import datetime
import time
import mediapipe as mp
import numpy as np
from PIL import Image
import time


# from generate_frames1 import *
# from generate_frames2 import *
from generate_frames3 import *

from exercises import *

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

app = Flask(__name__)

switch = 1
#cap = cv2.VideoCapture(0)
global hand
global userid
global exercisename
global severity
global expertime
global exerciseid
global activityid

def generate_frames1(hand="left"):
    cap = cv2.VideoCapture(0)

    params = {
        'counter': 0,
        'stage': None,
        't1': time.time(),
        't2': time.time(),
        'curr_timer': time.time(),
        'threshtime': 2,
        'times': [0] * 4,
        'feedback': None,
        'rep_time': None,
        'name': None,
        'error_timer': None,
        'error_flag': False,
        'play_box': False,
        'box_timer': None,
        'n_reps': 4,
        'error': 0,
        'rep_time_list': [],
        'max_angle': 0,
        'min_angle': 180,
        'plot' : False
    }

    # Setup mediapipe instance
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
                image = add_bounding_box(image, flag=flag)

                # add information bar
                image = add_info(image, flag, params)

                # elbow Flexion
                # This function is only called when flag == in
                if flag == 'in':
                    params['inside'] = True
                    image, params = elbowFlexion(image, landmarks, params)
                    image = add_feedback(image, params)
                else:
                    params['inside'] = False

            except:
                image = add_bounding_box(image, flag='out')
                image = add_info(image, 'out', params)

            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(
                                          color=(245, 117, 66), thickness=2, circle_radius=1),
                                      mp_drawing.DrawingSpec(
                                          color=(245, 66, 230), thickness=2, circle_radius=1)
                                      )

            ret, buffer = cv2.imencode(".jpg", image)
            image = buffer.tobytes()

            # if params['counter'] >= 1:
            
            params["timer"] = sum(params['rep_time_list'])


            r = requests.get(
                url="http://127.0.0.1:8000/score", params=params)

            # if capture:
            #     params["counter"] = counter
            #     r = requests.get(url="http://127.0.0.1:5000/score", params=params)
            #     break
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + image + b"\r\n")



# Squats
def generate_frames2(hand="left"):
    cap = cv2.VideoCapture(0)

    params = {
        'counter': 0,
        'stage': None,
        't1': time.time(),
        't2': time.time(),
        'curr_timer': time.time(),
        'threshtime': 4,
        'times': [0] * 3,
        'feedback': None,
        'rep_time': None,
        'name': None,
        'error_timer': None,
        'error_flag': False,
        'play_box': False,
        'box_timer': None,
        'n_reps': 3,
        'error': 0,
        'rep_time_list': [],
        'max_angle': 0,
        'min_angle': 180,
        'plot' : False
    }

    # Setup mediapipe instance
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
                flag = evaluate_flag_squats(landmarks, bounding_box)

                # add bounding box
                image = add_bounding_box(image, flag=flag)

                # add information bar
                image = add_info(image, flag, params)

                # elbow Flexion
                # This function is only called when flag == in
                if flag == 'in':
                    params['inside'] = True
                    image, params = squats(image, landmarks, params)
                    image = add_feedback_squats(image, params)
                else:
                    params['inside'] = False

            except:
                image = add_bounding_box(image, flag='out')
                image = add_info(image, 'out', params)

            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(
                                          color=(245, 117, 66), thickness=2, circle_radius=1),
                                      mp_drawing.DrawingSpec(
                                          color=(245, 66, 230), thickness=2, circle_radius=1)
                                      )

            ret, buffer = cv2.imencode(".jpg", image)
            image = buffer.tobytes()

            # if params['counter'] >= 1:
            params["timer"] = sum(params['rep_time_list'])


            r = requests.get(
                url="http://127.0.0.1:8000/score", params=params)

            # if capture:
            #     params["counter"] = counter
            #     r = requests.get(url="http://127.0.0.1:5000/score", params=params)
            #     break
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + image + b"\r\n")


@app.route("/")
def index11():
    return render_template("index11.html")


@app.route("/video1/")
def video1():
    return Response(
        generate_frames1(hand="left"),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


@app.route("/video2")
def video2():
    return Response(
        generate_frames2(hand = 'left'),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


@app.route("/video3")
def video3():
    return Response(
        generate_frames3(),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


@app.route("/elbowflexsion/<url>")
def exercise1(url):
    arr = url.split(",", 6)
    global hand
    global userid
    global exercisename
    global severity
    global expertime
    global exerciseid
    global activityid

    #global obj

    hand = arr[0]
    severity = arr[1]
    expertime = arr[2]
    userid = arr[3]
    exerciseid = arr[4]
    activityid = arr[5]

    exercisename = "elbowflexsion"

    obj = {
        "hand": hand,
        "severity": severity,
        "expertime": expertime,
        "userid": userid,
        "exercisename": exercisename,
        "exerciseid": exerciseid,
        "activityid": activityid,
    }

    return render_template("elbowflexsion.html", obj=obj, url=url)


@app.route("/aroms/<url>")
def exercise3(url):
    arr = url.split(",", 2)
    
    global userid
    global exercisename
    

    #global obj

    userid = arr[1]


    exercisename = "lateralflexion"

    obj = {
        
        "userid": userid,
        "exercisename": exercisename,
        
    }

    return render_template("lateralFlexion.html", obj=obj, url=url)

@app.route("/elboweccentric/<url>")
def exercise2(url):
    arr = url.split(",", 5)
    global userid
    global exercisename
    global severity
    global expertime
    global exerciseid
    global activityid

  

    severity = arr[0]
    expertime = arr[1]
    userid = arr[2]
    exerciseid = arr[3]
    activityid = arr[4]
    exercisename = "squats"
    obj = {
        # "hand": hand,
        "severity": severity,
        "expertime": expertime,
        "userid": userid,
        "exercisename": exercisename,
        "exerciseid": exerciseid,
        "activityid": activityid,
    }
    return render_template("elboweccentric.html", obj=obj, url=url)





@app.route("/complete", methods=['POST', 'GET'])
def complete():
    global userid

    obj1 = {
        "userid": userid,
        "name": exercisename,
        "min": params["min"],
        "max": params["max"] ,
    }
    # print(arr)
    # print('HL1010101')
    # print(obj1)

    headers = {"Content-Type": "application/json"}
    dictToSend = json.dumps(obj1)
    response = requests.post(
        "http://localhost:5000/api/excercise/aromsrecord",
        data=dictToSend,
        headers=headers,
    )

    # return render_template("aroms_result.html", obj=obj1)
    return request("post", "http://localhost:5000/api/exercise/report", data=arr)

@app.route("/score", methods=["GET", "POST"])
def score():
    global counter
    global timer
    global error

    global userid
    global exercisename
    global exerciseid
    global activityid


    if request.method == "GET":
        counter = request.args.get("counter")
        timer = request.args.get("timer")
        error = request.args.get("error")
    else:
        arr = [counter, timer, error]
        obj = {
            "counter": counter,
            "timer": timer,
            "error": error,
            "userid": userid,
            "exercisename": exercisename,
            "exerciseid": exerciseid,
            "activityid": activityid,
        }
        print(arr)
        headers = {"Content-Type": "application/json"}
        dictToSend = json.dumps(obj)
        response = requests.post(
            "http://localhost:5000/api/excercise/report",
            data=dictToSend,
            headers=headers,
        )
        return render_template("results.html", obj=obj)
        # return request("post", "http://localhost:5000/api/exercise/report", data=arr)

    return render_template("index11.html", res=counter)


if __name__ == "__main__":
    app.run(port=8000, debug=True)
