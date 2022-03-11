from flask import Flask, render_template, Response, request, jsonify, url_for
import json
import requests
import urllib.request

import cv2
import datetime, time
import mediapipe as mp
import numpy as np
from PIL import Image
import time

from generate_frames1 import *
from generate_frames2 import *
from generate_frames3 import *

mp_drawing_styles = mp.solutions.drawing_styles
mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=1, circle_radius=1)

app = Flask(__name__)

switch = 1
cap = cv2.VideoCapture(0)


@app.route("/")
def index11():
    return render_template("index11.html")


@app.route("/video1/")
def video1():
    return Response(
        generate_frames1(hand, severity, expertime),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


@app.route("/video2")
def video2():
    return Response(
        generate_frames2(hand, severity, expertime),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


@app.route("/video3")
def video3():
    return Response(
        generate_frames3(hand, severity, expertime),
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

    global obj
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


@app.route("/elboweccentric/<url>")
def exercise2(url):
    arr = url.split(",", 6)
    global hand
    global userid
    global exercisename
    global severity
    global expertime
    global exerciseid
    global activityid

    global obj
    hand = arr[0]
    severity = arr[1]
    expertime = arr[2]
    userid = arr[3]
    exerciseid = arr[4]
    activityid = arr[5]
    exercisename = "elboweccentric"
    obj = {
        "hand": hand,
        "severity": severity,
        "expertime": expertime,
        "userid": userid,
        "exercisename": exercisename,
        "exerciseid": exerciseid,
        "activityid": activityid,
    }
    return render_template("elboweccentric.html", obj=obj, url=url)


@app.route("/exercise3")
def exercise3():
    return render_template("exercise3.html")


@app.route("/score", methods=["GET", "POST"])
def score():
    global counter
    global timer
    global error
    global hand
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
            "hand": hand,
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
