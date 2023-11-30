const { Post, categories } = require("../models/post");
const User = require("../models/user");
const { ObjectId } = require("mongodb");

const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");
const comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

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

  res.render("post_detail", { post: post });
});

// Display post create form on GET.
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.render("post_form", {
    title: "Create Post",
    categories: categories,
  });
});

// Handle post create on POST.
exports.post_create_post = [
  body("title")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Question Title must be less than 200 characters")
    .isLength({ min: 5 })
    .withMessage("Queston Title must be longer than 5 characters"),
  body("body")
    .trim()
    .isLength({ max: 30000 })
    .withMessage("Question body must be less than 30,000 characters"),
  body("category").trim().isIn(categories).withMessage("Invalid category"),

  asyncHandler(async (req, res, next) => {
    console.log(req.body.category);
    const myValidationRequest = validationResult(req);
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      date_posted: new Date(),

      user: new ObjectId("655d5ddad96a2f8c2fd09cba"),
    });

    if (!myValidationRequest.isEmpty()) {
      const errors = myValidationRequest.array();
      res.render("post_form", {
        post: post,
        errors: errors,
        title: "Create Post",
        categories: categories,
      });
    } else {
      await post.save();
      res.redirect(post.url);
    }
  }),
];

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
