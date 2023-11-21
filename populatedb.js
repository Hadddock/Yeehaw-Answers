#! /usr/bin/env node

console.log(
  "This script populates some users, posts, and comments to your database. Specify database connection string as an argument"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

const posts = [];
const comments = [];
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
  await createPosts();
  await createComments();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(index, username, date_of_birth, date_joined) {
  const userdetail = { username: username };
  if (date_joined != false) userdetail.date_of_birth = date_joined;
  if (date_of_birth != false) userdetail.date_of_death = date_of_birth;
  const user = new User(userdetail);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function postCreate(
  index,
  title,
  body,
  category,
  date_posted,
  date_last_edited,
  user,
  comment
) {
  const postdetail = {
    title: title,
    body: body,
    category: category,
    date_posted: date_posted,
    user: user,
    comment: comment,
  };
  if (date_last_edited != false) userdetail.date_last_edited = date_last_edited;

  const post = new Post(postdetail);
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function commentCreate(
  index,
  body,
  date_posted,
  date_last_edited,
  comment_parent,
  user
) {
  const commentdetail = {
    body: body,
    date_posted: date_posted,
    user: user,
  };
  if (date_last_edited != false)
    commentdetail.date_last_edited = date_last_edited;
  if (comment_parent != false) commentdetail.comment_parent = comment_parent;

  const comment = new Comment(commentdetail);
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${body}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "SaveSerael", "1973-06-06", "2000-03-06"),
    userCreate(1, "LayerOcctavia", "1975-09-06", "2001-04-06"),
  ]);
}

async function createPosts() {
  console.log("Adding Posts");
  await Promise.all([
    postCreate(0, "What Can I do to stop negative thoughts?"),
    "Lately, I have had many negative thoughts that just drain my energy.   Overall, my life is okay and I'm not sure why my thinking has become very negative.How can I get rid of negative thoughts that are persistent and seem like they won't go away? Any advice would be appreciated.  Thank you for answering my questions.",
    "Social Science",
    new Date(),
    null,
    users[0],
    [comments[0], comments[1]],
  ]);
}

async function createComments() {
  console.log("Adding Comments");
  await Promise.all([
    commentCreate(0, "What Can I do to stop negative thoughts?"),
    "Lately, I have had many negative thoughts that just drain my energy.   Overall, my life is okay and I'm not sure why my thinking has become very negative.How can I get rid of negative thoughts that are persistent and seem like they won't go away? Any advice would be appreciated.  Thank you for answering my questions.",
    "Social Science",
    new Date(),
    null,
    null,
    users[1],
  ]);
}
