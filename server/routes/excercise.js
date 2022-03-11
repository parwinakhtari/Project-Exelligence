const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Excercise = require("../models/Excercise");
const User = require("../models/User");

// ROUTE 1 : Add a new excercise : Login required
router.post("/addExcercise/:id", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { excercise, noteExcercise, patientName } = req.body;
    const event = new Excercise({
      doctor: req.user.id,
      patient: req.params.id,
      startDate: new Date().toDateString(),
      note: noteExcercise,
      excercises: excercise,
      doctorName: user.name,
      patientName: patientName,
      completed: false,
    });
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Oops internal server error occured");
  }
});

// ROUTE 2 : Fetch patient excercise : Login required
router.get("/fetchexcercisepatient", fetchUser, async (req, res) => {
  try {
    const events = await Excercise.find({ patient: req.user.id }).sort({
      startDate: -1,
    });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 3 : Delete excercise from patient site : Login required
router.delete("/deleteexcercise/:id", fetchUser, async (req, res) => {
  try {
    //find the excercise to be deleted and then delete it
    let excercise = await Excercise.findById(req.params.id);
    if (!excercise) {
      return res.status(404).send("Such Excercise not found");
    }
    //if selected excercise is the loin users excercise
    if (excercise.patient.toString() !== req.user.id) {
      return res.status(401).send("Permission not granted");
    }
    excercise = await Excercise.findByIdAndDelete(req.params.id);
    res.send("Success!! Excercise deleted succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 4 : add report for patient portal : Login not required
router.post("/report", async (req, res) => {
  try {
    // const user =  await User.findById(req.user.id);
    let find = false;
    const {
      counter,
      timer,
      error,
      hand,
      userid,
      exercisename,
      activityid,
      exerciseid,
    } = req.body;
    const patient = await Excercise.findById(activityid);
    console.log(req.body);
    if (!patient) {
      return res.status(404).send("Permission not granted");
    }

    //if exercise already completed
    if (patient.completed === true) {
      return res.send(
        "This discharge exercise is already completed by patient"
      );
    }

    for (let index = 0; index < patient.excercises.length; index++) {
      const activity = patient.excercises[index];
      if (activity._id == exerciseid) {
        find = true;
        const reportObject = {
          counter: counter,
          timer: timer,
          error: error,
          hand: hand,
          date: new Date().toDateString(),
        };
        await activity.report.push(reportObject);
        await patient.save();
        break;
      }
    }
    if (!find) {
      return res.status(404).send("Such exercise not found");
    }
    res.send("Report saved succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Oops internal server error occured");
  }
});

// ROUTE 5 : Fetch patient excercises from doctor site : Login required
router.get("/fetchexercisedoctor/:id", fetchUser, async (req, res) => {
  try {
    //console.log(mongoose.Types.ObjectId(req.user.id) );
    const events = await Excercise.find({
      $and: [{ patient: req.params.id }, { doctor: req.user.id }],
    }).sort({
      startDate: -1,
    });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 6 : Delete exercise from doctor site : Login required
router.delete("/deleteexercise/:id", fetchUser, async (req, res) => {
  try {
    //find the exercise to be deleted and then delete it
    let exercise = await Excercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).send("Such exercise not found");
    }
    //if selected exercise is the login users prescription
    if (exercise.doctor.toString() !== req.user.id) {
      return res.status(401).send("Permission not granted");
    }
    exercise = await Excercise.findByIdAndDelete(req.params.id);
    res.send("Success!! exercise deleted succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 7 : Fetch exercise for patient portal : Login required
router.get("/fetchtExcercise", fetchUser, async (req, res) => {
  try {
    const activity = await Excercise.find({ patient: req.user.id });
    res.json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 8 : Fetch final report for doctor portal : Login required
router.get("/fetchtExcerciseDoctor", fetchUser, async (req, res) => {
  try {
    const activity = await Excercise.find({
      $and: [{ doctor: req.user.id }, { completed: true }],
    });
    res.json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 9 : Complete  excercise from patient site : Login required
router.put("/completeExcercise/:id", fetchUser, async (req, res) => {
  try {
    const { completed } = req.body;
    //find the activity to be deleted and then delete it
    let activity = await Excercise.findById(req.params.id);
    if (!activity) {
      return res.status(404).send("Such activity not found");
    }
    //if selected activity is the login users activity
    if (activity.patient.toString() !== req.user.id) {
      return res.status(401).send("Permission not granted");
    }
    activity.completed = completed;
    activity.save();
    const retactivity = await Excercise.find({ patient: req.user.id });
    res.json(retactivity);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

module.exports = router;
