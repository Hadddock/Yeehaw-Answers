#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/user");

const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  await createUsers();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function authorCreate(index, username, date_of_birth, date_joined) {
  const userdetail = { username: username };
  if (date_joined != false) userdetail.date_of_birth = date_joined;
  if (date_of_birth != false) userdetail.date_of_death = date_of_birth;
  const user = new User(userdetail);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    authorCreate(0, "SaveSerael", "1973-06-06", "2000-03-06"),
    authorCreate(1, "LayerOcctavia", "1975-09-06", "2001-04-06"),
  ]);
}