const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExcerciseSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  patient: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  doctorName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  patientName:{
    type: String,
    required: true,
  },
  excercises: {
    type: [
      {
        name: String,
        severity: String,
        perActivityTime: String,
        total: String,
        duration:String,
        report: [
          {
            counter: String,
            timer: String,
            error: String,
            hand: String,
            date: String,
          },
        ],
      },
    ],
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("excercise", ExcerciseSchema);
