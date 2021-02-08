const express = require("express");
const Workout = require("../models/Workout");
const Router = express.Router();

Router.post("/api/workouts/", (req, res) => {
  Workout.create(req.body).then((workout) => {
    res.json(workout);
  });
});

Router.get("/api/workouts/", (req, res) => {
  Workout.find(req.body).then((workout) => {
    res.json(workout);
  });
});

Router.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  Workout.findByIdAndUpdate(
    id,
    {
      $push: { exercises: req.body },
    },
    { new: true }
  ).then((workout) => {
    res.json(workout);
  });
});

Router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .sort({ _id: -1 })
    .then((workouts) => {
      res.json(workouts);
    });
});

module.exports = Router;
