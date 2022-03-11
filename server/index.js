const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

connectToMongo();

// For parsing application/json
app.use(express.json());

//for calling direct from browser
app.use(cors())

app.get('/', (req,res)=>{
  res.send('hello');
});

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/calendar", require("./routes/calendar"));
app.use("/api/reviews", require("./routes/review"));
app.use("/api/excercise", require("./routes/excercise"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
