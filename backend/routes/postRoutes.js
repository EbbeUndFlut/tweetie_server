const express = require("express");
const router = express.Router();
// @TODO postController implementieren
const { protectRoute } = require("../middleware/authMiddleware");
const { createPost, getPosts } = require("../controllers/postController");

router.use(protectRoute);
router.get('/', getPosts)
router.post("/", createPost);

module.exports = router;
