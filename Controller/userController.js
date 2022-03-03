const multer = require("multer");
const Post = require("../Model/PostModel");
const catchAsync = require("../Features/catchasync");
const AppError = require("../Features/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/posts");
  },
  filename: (req, file, cb) => {
    //user-userid-timestamp.jpeg
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});
const multerStoragephoto = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/posts");
  },
  filename: (req, file, cb) => {
    //user-userid-timestamp.jpeg
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});
const multerFilterimage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};
const multerFilterphoto = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilterimage,
});
const uploadPhoto = multer({
  storage: multerStoragephoto,
  fileFilter: multerFilterphoto,
});
exports.uploadimage = upload.single("image");
exports.uploadPhoto = uploadPhoto.single("photo");

exports.createPost = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(new AppError("Please fill the title and description"));
  }
  const post = await Post.create({
    user: req.user.id,
    image: req.file.filename,
    title,
    description,
  });
  res.status(201).send({ status: "success", post });
});
exports.getallposts = catchAsync(async (req, res) => {
  const allPost = await Post.find({ user: req.user._id });
  res.status(200).send({ status: "success", post: allPost });
});

exports.getPosts = catchAsync(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  res.status(200).send({ status: "success", post });
});
exports.deletePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  await Post.findByIdAndDelete(id);
  res
    .status(200)
    .send({ status: "success", message: "Post deleted successfully" });
});
exports.updatePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).send({ status: "success", post: updatedPost });
});
