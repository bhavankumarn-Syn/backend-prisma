// routes/auth.routes.ts

import express from "express";
import * as authController from "./auth.controller.ts";
import { upload } from "../../middleware/upload.ts";
import {authenticateToken} from "../../middleware/auth.ts";

const router = express.Router();

router.get("/all", authenticateToken, authController.getAllUsers);

router.get("/:id", authenticateToken, authController.getUser);

router.put("/:id", authenticateToken, authController.updateUser);

router.delete("/:id", authenticateToken, authController.deleteUser);

router.post(
  "/register",
  upload.single("avatar"),
  authController.register
);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post(
  "/:id/avatar",
  upload.single("avatar"),
  authController.uploadAvatar
);

export default router;