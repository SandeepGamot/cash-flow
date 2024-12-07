import { Router } from "express";
import { errorWrapper } from "../../../../middlewares/error-wrapper.middleware";
import { getPaymentModesHandler } from "./payment-mode.controller";

const router = Router();

router.get("/", errorWrapper(getPaymentModesHandler));
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;
