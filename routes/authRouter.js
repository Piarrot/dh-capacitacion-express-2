const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/register", authController.showRegister);
router.post("/register", authController.processRegister);

router.get("/login", authController.showLogin);
router.post("/login", authController.processLogin);

module.exports = router;