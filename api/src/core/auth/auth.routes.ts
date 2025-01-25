import { Router } from "express";
import { googleService } from "./google/google.service";
// import { googleCallbackHandler } from "./auth.controller";

const router = Router();

router.get("/google", (req, res) => {
  res.json({ url: googleService.googleAuthUrl() });
});

// router.get("/google/callback", googleCallbackHandler);

export default router;
