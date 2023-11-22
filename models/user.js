const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  date_of_birth: { type: Date },
  date_joined: { type: Date },
  username: { type: String, required: true, maxLength: 100, minLength: 1 },
});

UserSchema.virtual("time_active").get(function () {
  return new Date() - this.date_of_birth;
});

UserSchema.virtual("url").get(function () {
  return `/catalog/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
