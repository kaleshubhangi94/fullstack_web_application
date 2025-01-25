const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: { type: String },
  photoUrl: { type: String }, // Store photo URL from Cloudinary
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
