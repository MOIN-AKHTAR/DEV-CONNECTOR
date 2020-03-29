const Express = require("express");
const Passport = require("passport");
const ProfileModel = require("../../Models/Profile");
const PostModel = require("../../Models/Post");
const PostValidation = require("../../Validations/Post");
const Route = Express.Router();

//@Route /api/post/
//@Access Public
//@Desc  Get All Post
Route.get("/", async (req, res) => {
  const Posts = await PostModel.find({}).sort({ date: -1 });
  res.status(200).json({
    Status: "Success",
    Count: Posts.length,
    Posts
  });
});

//@Route /api/post/:id
//@Access Public
//@Desc  Get Single Post
Route.get("/:id", async (req, res) => {
  const Post = await PostModel.findById(req.params.id);
  res.status(200).json({
    Status: "Success",
    Post
  });
});

Route.use(Passport.authenticate("jwt", { session: false }));

//@Route /api/post/
//@Access Private
//@Desc  To Post
Route.post("/", async (req, res) => {
  const { error, isValid } = PostValidation(req.body);
  if (!isValid) {
    return res.status(400).json({
      Status: "Failed",
      error
    });
  }
  const newPost = new PostModel({
    user: req.user.id,
    name: req.body.name,
    text: req.body.text,
    avatar: req.body.avatar
  });
  await newPost.save();
  res.status(201).json({
    Status: "Success",
    Post: newPost
  });
});

//@Route /api/post/:id
//@Access Private
//@Desc  DELETE Post
Route.delete("/:id", async (req, res) => {
  //   const Profile = await ProfileModel.findOne({ user: req.user.id });
  const Post = await PostModel.findById(req.params.id);
  if (Post.user.toString() !== req.user.id) {
    return res.status(401).json({
      Status: "Failed",
      Message: "You Are Not Authorized"
    });
  }
  await Post.remove();
  res.status(200).json({
    Status: "Success"
  });
});

//@Route /api/post/like/:id
//@Access Private
//@Desc  Like A Post
Route.post("/like/:id", async (req, res) => {
  const Profile = await ProfileModel.findOne({ user: req.user.id });
  const Post = await PostModel.findById(req.user.id);
  if (
    Post.likes.filter(like => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(400).json({
      Status: "Success",
      Message: "You Already Liked This Post"
    });
  }
  Post.likes.unshift({ user: req.user.id });
  await Post.save();
  res.status(200).json({
    Status: "Success",
    Post
  });
});

//@Route /api/post/unlike/:id
//@Access Private
//@Desc  Unlike A Post
Route.post("/unlike/:id", async (req, res) => {
  const Profile = await ProfileModel.findOne({ user: req.user.id });
  const Post = await PostModel.findById(req.user.id);
  if (
    Post.likes.filter(like => like.user.toString() === req.user.id).length === 0
  ) {
    return res.status(400).json({
      Status: "Success",
      Message: "You Havn't Even Like"
    });
  }
  const RemoveIndex = Post.likes
    .map(item => item.user.toString())
    .indexOf(req.user.id);
  Post.likes.splice(RemoveIndex, 1);
  await Post.save();
  res.status(200).json({
    Status: "Success",
    Post
  });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post("/comment/:id", async (req, res) => {
  const { errors, isValid } = PostValidation(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json({
      Status: "Failed",
      errors
    });
  }

  const post = await PostModel.findById(req.params.id);
  if (!post) {
    return {
      Sttaus: "Failed",
      Message: "Couldn't Found This Post"
    };
  }
  const newComment = {
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  };

  // Add to comments array
  post.comments.unshift(newComment);

  // Save
  await post.save();
  res.status(200).json({
    Status: "Success",
    post
  });
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete("/comment/:id/:comment_id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      Status: "Failed",
      Message: "Couldn't Find This Post"
    });
  }
  // Check to see if comment exists
  if (
    post.comments.filter(
      comment => comment._id.toString() === req.params.comment_id
    ).length === 0
  ) {
    return res.status(404).json({ commentnotexists: "Comment does not exist" });
  }

  // Get remove index
  const removeIndex = post.comments
    .map(item => item._id.toString())
    .indexOf(req.params.comment_id);

  // Splice comment out of array
  post.comments.splice(removeIndex, 1);

  await post.save();
  res.status(200).json({ Status: "Success", post });
});

module.exports = Route;
