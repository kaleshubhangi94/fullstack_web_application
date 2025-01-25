const express = require('express');
const { createPost } = require('../controllers/feedController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/posts', authMiddleware, createPost);

module.exports = router;
