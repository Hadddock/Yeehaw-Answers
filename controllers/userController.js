const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display detail page for a specific user.
exports.user_detail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  res.render("user_detail", { user: user });
});

// Display user create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("user_form", { title: "Create User" });
});

// Handle user create on POST.
exports.user_create_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username empty")
    .isLength({ max: 100 })
    .withMessage("username must be less than 100 characters long"),

  asyncHandler(async (req, res, next) => {
    //Extract the validation errors from a request
    const myValidationResult = validationResult(req);
    const user = new User({
      username: req.body.username,
      date_of_birth: req.body.date_of_birth,
    });

    const usernameTaken = await User.findOne({
      username: req.body.username,
    }).exec();

    if (!myValidationResult.isEmpty() || usernameTaken) {
      const errors = myValidationResult.array();

      if (usernameTaken) {
        errors.push({ msg: "Username is taken", path: "username" });
      }
      res.render("user_form", {
        user: user,
        title: "Create User",
        errors: errors,
      });
      return;
    } else {
      await user.save();
      res.redirect(user.url);
    }
  }),
];

// Display user delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user delete GET");
});

// Handle user delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user delete POST");
});

// Display user update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user update GET");
});

// Handle user update on POST.
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: user update POST");
});
