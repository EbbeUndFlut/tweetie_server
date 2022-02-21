const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const {
	loginUser,
	registerUser,
	getCurrentUser,
	getSignedUrl,
} = require("../controllers/userController");
//Um den Zugriff auf eine Route zu beschränken, protectRoute als 2. argument der jeweiligen Route hinzufügen
const { protectRoute } = require("../middleware/authMiddleware");

router.post("/", upload.none(), registerUser);
router.post("/login", loginUser);
router.get("/currentuser", protectRoute, getCurrentUser);
router.get("/signedurl", getSignedUrl);

// Logout DELETE COOKIE
router.get("/logout", (req, res) => {
	//DELETING TweetieToken COOKIE
	res.clearCookie("TweetieToken");
	// REDIRECT To Login
	res.redirect("/");
});

module.exports = router;
