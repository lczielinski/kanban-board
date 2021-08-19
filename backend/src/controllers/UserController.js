const User = require('../models/User');
const router = require('express').Router();

router.route('/register').post(async (req, res) => {
  try {
    const prevUser = await User.findOne({ username: req.body.username.toLowerCase() });
    if (prevUser) {
      return res.status(400).json('Username exists.');
    };
  
    const newUser = new User({
      name: req.body.name,
      username: req.body.username.toLowerCase(),
      password: req.body.password,
    });
  
    await newUser.save();
    
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
    return res.status(500).json(err);
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
    return res.status(500).json(err);
  }
});

router.route('/get').post(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
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
    return res.status(500).json(err);
  }
});

module.exports = router;
