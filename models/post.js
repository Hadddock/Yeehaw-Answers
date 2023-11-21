const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 5, maxLength: 200 },
  body: { type: String, minlength: 3, maxLength: 30000 },
  date_posted: { type: Date },
  date_last_edited: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
