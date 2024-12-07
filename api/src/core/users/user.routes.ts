import { Router } from "express";
import { cachedResponse } from "../../middlewares/cached-response.middleware";
import { verifyUserHandler } from "./user.controller";

const router = Router();

router.get("/");
router.get("/:id");
router.get("/verify", cachedResponse("max-age=3600"), verifyUserHandler);

router.post("/");

export default router;
