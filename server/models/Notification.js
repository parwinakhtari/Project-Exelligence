const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdById: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("notification", NotificationSchema);
