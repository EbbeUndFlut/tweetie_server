const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/authMiddleware");
const {
	createPost,
	getPosts,
	getPost,
	searchPosts,
	getConversation,
} = require("../controllers/postController");

router.use(protectRoute);
router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.post("/conversation", getConversation)

module.exports = router;
