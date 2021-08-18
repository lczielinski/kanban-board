const User = require('../models/User');
const router = require('express').Router();

router.route('/register').post( async (req, res) => {
  const prevUser = await User.findOne({ username: req.body.username });
  if (prevUser) {
    return res.status(400).json("Username exists.");
  };

  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });

  newUser.save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

router.route('/login').post((req, res) => {
  
});

router.route('/delete/:id').delete((req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(success => res.json('Success! User deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
});

module.exports = router;
