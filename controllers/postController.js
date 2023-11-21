const Post = require("../models/post");

const asyncHandler = require("express-async-handler");

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: post list");
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: post detail: ${req.params.id}`);
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
