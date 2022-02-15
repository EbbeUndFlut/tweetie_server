const express = require("express");
const router = express.Router();
const { loginUser, registerUser, getCurrentUser } = require("../controllers/userController");
//Um den Zugriff auf eine Route zu beschränken, protectRoute als 2. argument der jeweiligen Route hinzufügen
const { protectRoute } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/currentuser", protectRoute, getCurrentUser)

module.exports = router;