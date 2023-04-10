const router = require("express").Router();

// Models
const User = require("../models/User");
const Post = require("../models/Post");

// Middleware
const verifyAuth = require("../middleware/verifyAuth");

// @route GET | api/v1/posts | public | Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ data: posts, success: true });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false });
  }
});

// @route GET | api/v1/followers-posts | public | Get all posts from the users that logged in user follow
router.get("/followers-posts", verifyAuth, async (req, res) => {
  try {
    const get_user = await User.findById(req.user.id);
    const posts = await Post.find({ UserId: get_user.following }).populate(
      "posted_by"
    );
    res.status(200).json({
      data: posts,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

// @route GET | api/v1/posts/:id | public | Get a single post by id
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({
      data: post,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

// @route POST | /api/v1/add-new | private | Add a new post
router.post("/add-new", verifyAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      UserId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      post_image: req.body.image_url,
    });

    res.status(200).json({
      data: newPost,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

// @route PUT | /api/v1/post/edit-post/:id | private | Edit a post
router.put("/edit-post/:id", verifyAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400).json({ success: false });
    }

    if (!post.UserId === req.user.id) {
      res.status(400).json({ success: false });
    } else {
      post.updateOne({
        UserId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        post_image: req.body.image_url,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

// @route DELETE | /api/v1/post/delete-post/:id | private | Delete a post
router.delete("/delete-post/:id", verifyAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400).json({ success: false });
    }

    if (!post.UserId === req.user.id) {
      res.status(400).json({ success: false });
    } else {
      post.deleteOne();
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

module.exports = router;
