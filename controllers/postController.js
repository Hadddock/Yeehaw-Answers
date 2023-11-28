const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");
const comment = require("../models/comment");

exports.index = asyncHandler(async (req, res, next) => {
  const [post_count, user_count, comment_count] = await Promise.all([
    Post.countDocuments({}).exec(),
    User.countDocuments({}).exec(),
    Comment.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Yeehaw Answers Home",
    user_count: user_count,
    comment_count: comment_count,
    post_count: post_count,
  });
});

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}, "title body").exec();

  res.render("post_list", {
    title: "Post List",
    post_list: allPosts,
  });
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const [post] = await Promise.all([
    Post.findById(req.params.id)
      .populate("user")
      .populate({
        path: "comment",
        model: "Comment",
        populate: {
          path: "user",
          model: "User",
          populate: { path: "username" },
        },
      })
      .exec(),
  ]);

  console.log(post.populated("comment.user"));
  console.log("test");

  res.render("post_detail", { post: post });
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post create GET");
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post create POST");
});

// Display post delete form on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post delete GET");
});

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post delete POST");
});

// Display post update form on GET.
exports.post_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post update GET");
});

// Handle post update on POST.
exports.post_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post update POST");
});
