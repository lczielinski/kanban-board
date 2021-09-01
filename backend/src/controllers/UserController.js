const User = require('../models/User');
const { Task } = require('../models/Task');
const router = require('express').Router();

router.route('/register').post(async (req, res) => {
  try {
    const prevUser = await User.findOne({ 
      username: req.body.username.toLowerCase() 
    });
    if (prevUser) {
      return res.status(400).json('Username exists.');
    };
  
    const newUser = new User({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      password: req.body.password
    });
  
    await newUser.save();
    const tempUser = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      toDoTasks: newUser.toDoTasks,
      inProgressTasks: newUser.inProgressTasks,
      completedTasks: newUser.completedTasks
    }
    return res.status(200).json(tempUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.route('/login').post(async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.body.username.toLowerCase(), 
      password: req.body.password
    }); 

    if (user) {
      const tempUser = {
        _id: user._id,
        name: user.name,
        username: user.username,
        toDoTasks: user.toDoTasks,
        inProgressTasks: user.inProgressTasks,
        completedTasks: user.completedTasks
      }
      return res.status(200).json(tempUser);
    } else {
      res.status(404).json('Username and password not found.');
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route('/get').post(async (req, res) => {
  try {
    const user = await User.findOne({ 
      _id: req.body._id 
    });
    if (!user) {
      return res.status(404).json('Could not find user.');
    }

    const tempUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      toDoTasks: user.toDoTasks,
      inProgressTasks: user.inProgressTasks,
      completedTasks: user.completedTasks
    }
    return res.status(200).json(tempUser);
  } catch (err) {
    return res.status(404).json('Could not find user.');
  }
});

router.route('/delete/:id').delete(async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200);
    
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.route('/add-task').post(async (req, res) => {
  try {
    const newTask = new Task({
      status: 0,
      title: req.body.title,
      description: req.body.description
    });

    await newTask.save();

    await User.findByIdAndUpdate(req.body._id, {
      $push: { toDoTasks: newTask }
    });

    const user = await User.findOne({ 
      _id: req.body._id
    });
    if (!user) {
      return res.status(404).json('Could not find user.');
    }

    const tempUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      toDoTasks: user.toDoTasks,
      inProgressTasks: user.inProgressTasks,
      completedTasks: user.completedTasks
    }
    return res.status(200).json(tempUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.route('/delete-task').post(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { toDoTasks: { _id: req.body.taskId } }
    });

    await Task.deleteOne({ _id: req.body.taskId });

    const user = await User.findOne({ 
      _id: req.body.userId
    });
    if (!user) {
      return res.status(404).json('Could not find user.');
    }

    const tempUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      toDoTasks: user.toDoTasks,
      inProgressTasks: user.inProgressTasks,
      completedTasks: user.completedTasks
    }
    return res.status(200).json(tempUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
