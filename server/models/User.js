const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  specialization: {
    type: String,
  },
  hospital: {
    type: String,
  },
  experience: {
    type: String,
  },
  img: {
    type: String,
  },
  disease: {
    type: String,
  },
  reviews: [
    {
      fromName: String,
      fromEmail: String,
      review: String,
    },
  ],
  enrolledPatient: [
    {
      patientName: String,
      patientEmail: String,
      patientId:String,
      patientImage: String,
      patientDate: Date,
    },
  ],
});
const User = new mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
