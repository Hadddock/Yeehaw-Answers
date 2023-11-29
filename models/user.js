const mongoose = require("mongoose");
const { DateTime } = require("luxon");
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

UserSchema.virtual("date_of_birth_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
    DateTime.DATE_ME
  );
});

UserSchema.virtual("date_joined_formatted").get(function () {
  return DateTime.fromJSDate(this.date_joined).toLocaleString(DateTime.DATE_ME);
});

module.exports = mongoose.model("User", UserSchema);
