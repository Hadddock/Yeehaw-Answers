const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, minlength: 3, maxLength: 30000 },
  date_posted: { type: Date },
  date_last_edited: { type: Date },
  comment_parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
