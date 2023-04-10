const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post_image: {
      type: String,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
    likes: {
      type: Array,
    },
    post_emotion: {
      // this will be filled bt AI/ML later
      type: String,
      default: null,
    },
    created_at: {
      type: String,
    },
    updated_at: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.pre("save", function (next) {
  let date_info = new Date();
  date_info =
    date_info.getDate() +
    "/" +
    date_info.getMonth() +
    "/" +
    date_info.getFullYear();
  if (this.created_at) this.updated_at = date_info;
  else this.created_at = date_info;
});

PostSchema.virtual("posted_by", {
  ref: "user",
  localField: "UserId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("post", PostSchema);
