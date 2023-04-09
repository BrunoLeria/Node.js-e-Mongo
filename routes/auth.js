const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyAuth = require("../middleware/verifyAuth");

// @route   POST api/v1/auth/register | public | Register a user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please enter all required fields", success: false });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists", success: false });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // payload || {id: user._id}
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          success: true,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

// @route   POST api/v1/auth/login | public | Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please enter all required fields", success: false });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          success: true,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

// @route   GET api/v1/auth/user | private | Get logged in user for the process of authentication
router.get("/user", verifyAuth, (req, res) => {
  try {
    const user = User.findById(req.user.id).populate("posts");
    res.status(200).json({ user, success: true });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

module.exports = router;