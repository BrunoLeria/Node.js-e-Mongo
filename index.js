const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

//Load routes
const posts = require("./routes/posts");
const auth = require("./routes/auth");
const features = require("./routes/features");

// Load env vars
dotenv.config({ path: "./config/config.env" });
require("./config/Db");

// Dev logging middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", posts);
app.use("/api/v1", auth);
app.use("/api/v1", features);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
