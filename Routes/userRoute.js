const express = require("express");
const authController = require("../Controller/authController");
const userController = require("../Controller/userController");
const router = express.Router();

router.route("/sign-up").post(userController.uploadPhoto,authController.signup);
router.route("/login").post(authController.login);
router.use(authController.protect);
router
  .route("/me/createpost")
  .post(userController.uploadimage, userController.createPost);
router.route("/getposts").get(userController.getallposts);
router
  .route("/:id")
  .get(userController.getPosts)
  .put(userController.updatePost)
  .delete(userController.deletePost);
module.exports = router;
