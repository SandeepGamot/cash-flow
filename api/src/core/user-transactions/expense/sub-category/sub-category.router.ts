import { Router } from "express";
import { errorWrapper } from "../../../../middlewares/error-wrapper.middleware";
import { getSubCatgoriesHandler } from "./sub-category.controller";

const router = Router();

router.get("/", errorWrapper(getSubCatgoriesHandler));
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;
