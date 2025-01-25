import { Router } from "express";
import { cachedResponse } from "../../middlewares/cached-response.middleware";
import {
  loginUserHandler,
  registerUserHandler,
  verifyUserHandler,
} from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowCredentials } from "../../middlewares/allow-credentials.middleware";

const router = Router();

router.get("/");
router.get("/:id");
router.get(
  "/verify",
  authMiddleware,
  allowCredentials,
  cachedResponse("max-age=3600"),
  verifyUserHandler
);
router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
router.post("/");

export default router;
