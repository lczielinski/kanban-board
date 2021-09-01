const User = require("../models/User");
const { Task } = require("../models/Task");
const router = require("express").Router();

router.route("/register").post(async (req, res) => {
  try {
    const prevUser = await User.findOne({ 
      username: req.body.username.toLowerCase() 
    });
    if (prevUser) {
      return res.status(409).json("Username exists.");
    };
  
    const newUser = new User({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      password: req.body.password
    });
  
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.body.username.toLowerCase(), 
      password: req.body.password
    }); 

    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(404).json("Username and password not found.");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route("/get/:userId").get(async (req, res) => {
  try {
    const user = await User.findOne({ 
      _id: req.params.userId 
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json("Could not find user.");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route("/add-task").post(async (req, res) => {
  try {
    const newTask = new Task({
      status: 0,
      title: req.body.title,
      description: req.body.description
    });
    await newTask.save();

    await User.findByIdAndUpdate(req.body.userId, {
      $push: { tasks: newTask }
    });

    const user = await User.findOne({ 
      _id: req.body.userId
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json("Could not find user.");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route("/delete-task").post(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { tasks: { _id: req.body.taskId } }
    });

    await Task.deleteOne({ _id: req.body.taskId });

    const user = await User.findOne({ 
      _id: req.body.userId
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json("Could not find user.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
