const router = require("express").Router();

const Post = require("../models/Post");
const User = require("../models/User");
const verifyAuth = require("../middleware/verifyAuth");

// @route GET | /api/v1/like/:id | private | Like a post by id
router.get("/like/:id", verifyAuth, async (req, res) => {
  try {
    const liked = await Post.updateOne(
      {
        _id: req.params.id,
      },
      {
        $push: {
          likes: req.user.id,
        },
      }
    );
    if (!liked) {
      return res.status(401).json({ success: false });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});
// @route GET | /api/v1/unlike/:id | private | Unlike a post by id
router.get("/unlike/:id", verifyAuth, async (req, res) => {
  try {
    const unliked = await Post.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          likes: req.user.id,
        },
      }
    );
    if (!unliked) {
      return res.status(401).json({ success: false });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});
// @route GET | /api/v1/follow/:id | private | Follow another user
router.get("/follow/:id", verifyAuth, async (req, res) => {
  try {
    const followed = await User.updateOne(
      {
        _id: req.user.id,
      },
      {
        $push: {
          following: req.params.id,
        },
      }
    );

    const followerAdded = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $push: {
          followers: req.user.id,
        },
      }
    );
    if (!followed || followerAdded) {
      return res.status(401).json({ success: false });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});
// @route GET | /api/v1/unfollow/:id | private | Unfollow another user
router.get("/unfollow/:id", verifyAuth, async (req, res) => {
  try {
    const unfollowed = await User.updateOne(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          following: req.params.id,
        },
      }
    );

    const followerRemoved = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          followers: req.user.id,
        },
      }
    );
    if (!unfollowed || followerRemoved) {
      return res.status(401).json({ success: false });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});
// @route GET | /api/v1/profile/:id | private | Get an user by id
router.get("/profile/:id", verifyAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({ success: false });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});
