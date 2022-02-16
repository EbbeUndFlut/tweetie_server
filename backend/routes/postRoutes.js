const express = require("express");
const router = express.Router();
// @TODO postController implementieren
const { protectRoute } = require("../middleware/authMiddleware");

router.use(protectRoute());
router.get("/", (req, res) => {
	res.json({ message: "hola" });
});

module.exports = router;
