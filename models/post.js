const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 5, maxLength: 200 },
  body: { type: String, minlength: 3, maxLength: 30000 },
  category: {
    type: String,
    enum: [
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
    ],
  },
  date_posted: { type: Date },
  date_last_edited: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
