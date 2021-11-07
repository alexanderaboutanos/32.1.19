/** @format */

const express = require("express");
const { parse } = require("path/posix");
const app = express();

const ExpressError = require("./expressError");

// To parse http request body on each request:
app.use(express.json()); //For JSON

// QUERY STRING!
app.get("/mean", (req, res) => {
  const nums = req.query.nums;
  if (!nums) throw new ExpressError("nums are required!", 400);
  let meanArr = nums.split(",").map((val) => {
    if (isNaN(parseInt(val))) {
      throw new ExpressError("one your numbers isn't actually a number!", 400);
    } else {
      return parseInt(val);
    }
  });
  let sum = 0;
  for (let i = 0; i < meanArr.length; i++) {
    sum += meanArr[i];
  }
  mean = sum / meanArr.length;
  response = { operation: "mean", value: mean };
  return res.json(response);
});

app.get("/mode", (req, res) => {
  const nums = req.query.nums;
  if (!nums) throw new ExpressError("nums are required!", 400);
  let arr = nums.split(",").map((val) => {
    if (isNaN(parseInt(val))) {
      throw new ExpressError("one your numbers isn't actually a number!", 400);
    } else {
      return parseInt(val);
    }
  });
  mode = arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
  response = { operation: "mode", value: mode };
  return res.json(response);
});

app.get("/median", (req, res) => {
  const nums = req.query.nums;
  if (!nums) throw new ExpressError("nums are required!", 400);
  let arr = nums.split(",").map((val) => {
    if (isNaN(parseInt(val))) {
      throw new ExpressError("one your numbers isn't actually a number!", 400);
    } else {
      return parseInt(val);
    }
  });
  let median;
  arr.sort(function (a, b) {
    return a - b;
  });
  let half = Math.floor(arr.length / 2);
  median = arr[half];
  response = { operation: "median", value: median };
  return res.json(response);
});

app.use((req, res, next) => {
  const err = new ExpressError("Page Not Found", 404);
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  //Note the 4 parameters!
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});
