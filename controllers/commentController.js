const Comment = require("../models/comment");
const { ObjectId } = require("mongodb");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { isObjectIdOrHexString } = require("mongoose");

// Display detail page for a specific comment.
exports.comment_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: comment detail: ${req.params.id}`);
});

// Display comment create form on GET.
exports.comment_create_get = asyncHandler(async (req, res, next) => {
  res.render("comment_form", { title: "Create comment" });
});

// Handle comment create on POST.
exports.comment_create_post = [
  body("body")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment must not be empty")
    .isLength({ max: 30000 })
    .withMessage("Comment must be less than 30,000 characters"),
  asyncHandler(async (req, res, next) => {
    const myValidationResult = validationResult(req);
    const comment = Comment({
      body: req.body.body,
      post: new ObjectId("655d5ddad96a2f8c2fd09cc0"),
      user: new ObjectId("655d5ddad96a2f8c2fd09cba"),
      date_posted: new Date(),
    });
    if (!myValidationResult.isEmpty()) {
      const errors = myValidationResult.array();
      res.render("comment_form", {
        comment: comment,
        title: "Create Comment",
        errors: errors,
      });
    } else {
      await comment.save();
      res.redirect(comment.url);
    }
  }),
];

// Display comment delete form on GET.
exports.comment_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment delete GET");
});

// Handle comment delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment delete POST");
});

// Display comment update form on GET.
exports.comment_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment update GET");
});

// Handle comment update on POST.
exports.comment_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment update POST");
});
