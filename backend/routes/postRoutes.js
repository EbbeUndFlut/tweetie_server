const express = require("express")
const router = express.Router()
const { protectRoute } = require("../middleware/authMiddleware")
const { createPost, getPosts, getPost, searchPosts, getConversation, setAsFav, getFavs } = require("../controllers/postController")

router.use(protectRoute)
router.get("/", getPosts)
router.get("/search", searchPosts)
router.get("/:id", getPost)
router.post("/", createPost)
router.post("/conversation", getConversation)
router.post("/fav", setAsFav)
router.get("/favs", getFavs)

module.exports = router
