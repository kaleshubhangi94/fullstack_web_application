const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  const { caption, photoUrl } = req.body;
  const post = new Post({ caption, photoUrl, user: req.user._id });
  await post.save();
  res.status(201).json(post);
};
