import { Router } from "express";
import { getCatgoriesHandler } from "./category.controller";
import { errorWrapper } from "../../../../middlewares/error-wrapper.middleware";

const router = Router();

router.get("/", errorWrapper(getCatgoriesHandler));
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;
