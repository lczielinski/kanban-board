const User = require('../models/User');
const router = require('express').Router();

router.route('/register').post( async (req, res) => {
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
  
    newUser.save()
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));

  } catch (err) {
    return res.status(500).json(err);
  }
});

router.route('/login').post( async (req, res) => {
  try {
    const user = await User.findOne({ 
      username: req.body.username.toLowerCase(), 
      password: req.body.password
    }); 

    if (!user) {
      return res.status(404).json('Username and password not found.');
    } else {
      return res.status(200).json(user);
    }

  } catch (err) {
    return res.status(500).json(err);
  }
});

router.route('/delete/:id').delete((req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(success => res.json('Success! User deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
});

module.exports = router;
