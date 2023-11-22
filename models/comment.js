const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, minlength: 3, maxLength: 30000 },
  date_posted: { type: Date },
  date_last_edited: { type: Date },
  comment_parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

CommentSchema.virtual("url").get(function () {
  return `/catalog/comment/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);
