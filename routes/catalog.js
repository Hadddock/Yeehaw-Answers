const express = require("express");
const router = express.Router();

// Require controller modules.
const post_controller = require("../controllers/postController");
const user_controller = require("../controllers/userController");
const comment_controller = require("../controllers/commentController");

/// POST ROUTES ///

// GET catalog home page.
router.get("/", post_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/post/create", post_controller.post_create_get);

// POST request for creating post.
router.post("/post/create", post_controller.post_create_post);

// GET request to delete post.
router.get("/post/:id/delete", post_controller.post_delete_get);

// POST request to delete post.
router.post("/post/:id/delete", post_controller.post_delete_post);

// GET request to update post.
router.get("/post/:id/update", post_controller.post_update_get);

// POST request to update post.
router.post("/post/:id/update", post_controller.post_update_post);

// GET request for one post.
router.get("/post/:id", post_controller.post_detail);

// GET request for list of all post items.
router.get("/posts", post_controller.post_list);

/// USER ROUTES ///

// GET request for creating user. NOTE This must come before route for id (i.e. display user).
router.get("/user/create", user_controller.user_create_get);

// POST request for creating User.
router.post("/user/create", user_controller.user_create_post);

// GET request to delete User.
router.get("/user/:id/delete", user_controller.user_delete_get);

// POST request to delete User.
router.post("/user/:id/delete", user_controller.user_delete_post);

// GET request to update User.
router.get("/user/:id/update", user_controller.user_update_get);

// POST request to update User.
router.post("/user/:id/update", user_controller.user_update_post);

// GET request for one User.
router.get("/user/:id", user_controller.user_detail);

// GET request for list of all Users.
router.get("/users", user_controller.user_list);

/// COMMENT ROUTES ///

// GET request for creating a Comment. NOTE This must come before route that displays Comment (uses id).
router.get("/comment/create", comment_controller.comment_create_get);

//POST request for creating Comment.
router.post("/comment/create", comment_controller.comment_create_post);

// GET request to delete Comment.
router.get("/comment/:id/delete", comment_controller.comment_delete_get);

// POST request to delete Comment.
router.post("/comment/:id/delete", comment_controller.comment_delete_post);

// GET request to update Comment.
router.get("/comment/:id/update", comment_controller.comment_update_get);

// POST request to update Comment.
router.post("/comment/:id/update", comment_controller.comment_update_post);

// GET request for one Comment.
router.get("/comment/:id", comment_controller.comment_detail);

// GET request for list of all Comment.
router.get("/comments", comment_controller.comment_list);

module.exports = router;
