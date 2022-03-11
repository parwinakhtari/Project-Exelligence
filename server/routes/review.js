const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");

// ROUTE 1 : Add a new review: Login required
router.post("/addreview/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const mentor = await User.findById(id);
    const user = await User.findById(req.user.id);
    const { reviewmessage } = req.body;
    const reviewobject = {
      fromName: user.name,
      fromEmail: user.email,
      review: reviewmessage,
    };
    await mentor.reviews.push(reviewobject);
    const savedReview = await mentor.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

module.exports = router;
