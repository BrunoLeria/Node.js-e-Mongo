const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("DATABASE CONNECTION ERROR", err);
    process.exit(1);
  });
