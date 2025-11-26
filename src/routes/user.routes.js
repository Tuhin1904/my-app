const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.post("/sign-in", userController.signIn);

module.exports = router;
