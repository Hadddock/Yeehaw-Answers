const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { DateTime } = require("luxon");
const categories = [
  "Arts & Humanities",
  "Beauty & Style",
  "Business & Finance",
  "Cars & Transportation",
  "Computers & Internet",
  "Consumer Electronics",
  "Dining Out",
  "Education & Reference",
  "Entertainment & Music",
  "Environment",
  "Family & Relationships",
  "Food & Drink",
  "Games & Recreation",
  "Health",
  "Home & Garden",
  "Local Businesses",
  "News & Events",
  "Pets",
  "Politics & Government",
  "Pregnancy & Parenting",
  "Science & Mathematics",
  "Social Science",
  "Society & Culture",
  "Sports",
  "Travel",
  "Yahoo Products",
];

exports.categories = categories;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 5, maxLength: 200 },
  body: { type: String, maxLength: 30000 },
  category: {
    type: String,
    enum: categories,
  },
  date_posted: { type: Date },
  date_last_edited: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

PostSchema.virtual("date_posted_formatted").get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(DateTime.DATE_ME);
});

PostSchema.virtual("date_last_edited_formatted").get(function () {
  return DateTime.fromJSDate(this.date_last_edited).toLocaleString(
    DateTime.DATE_ME
  );
});

PostSchema.virtual("url").get(function () {
  return `/catalog/post/${this._id}`;
});

exports.Post = mongoose.model("Post", PostSchema);
