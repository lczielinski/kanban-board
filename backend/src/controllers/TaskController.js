const User = require('../models/User');
const { Task } = require('../models/Task');
const router = require('express').Router();

router.route('/create').post(async (req, res) => {
  try {
    const newTask = new Task({
      status: 1,
      title: req.body.title,
      description: req.body.description
    });
  
    await newTask.save();
    return res.status(200).json(newTask);

  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
