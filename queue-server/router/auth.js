const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
import { check } from "express-validator";
import authMiddleware from "../middleware/auth";

router.post(
  "/registration",
  [
    check("fullname", "Field is required").notEmpty(),
    check("username", "Field is required").notEmpty(),
    check("password", "Field is required").notEmpty(),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/usergroups", authMiddleware, controller.getUsergroups);
router.get("/current_user", authMiddleware, controller.getCurrentUser);
// router.post("/login", controller.login);

export default router;
