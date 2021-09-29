const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/registration", controller.registration);
router.post("/login", controller.login);

export default router;
