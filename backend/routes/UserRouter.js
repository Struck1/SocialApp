const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = require('express').Router();

//update User

router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      });

      res.status(200).json('Account has been updated');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can update only your account');
  }
});

//delete user

router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can delete only your account');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      '-password -updatedAt'
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id/follow', async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.id);
      if (!user.followers.includes(req.body.id)) {
        await user.updateOne({ $push: { followers: req.body.id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json('you cant follow yourself');
  }
});

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.id);
      if (user.followers.includes(req.body.id)) {
        await user.updateOne({ $pull: { followers: req.body.id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json('you cant follow yourself');
  }
});
module.exports = router;
