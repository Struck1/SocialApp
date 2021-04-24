const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json('user exist');
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password: hash
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    !comparePass && res.status(404).json('wrong password');

    if (!user) {
      return res.status(404).json('user not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
