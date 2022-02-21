const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/authMiddleware");
const { createPost, getPosts, getPost } = require("../controllers/postController");

router.use(protectRoute);
router.get('/', getPosts)
router.get('/:id',getPost)
router.post("/", createPost);

module.exports = router;
