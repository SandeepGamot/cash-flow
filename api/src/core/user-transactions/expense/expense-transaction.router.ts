import { Router } from "express";
import ExpenseCategoriesRoutes from "./category/category.router";
import ExpenseSubCategoriesRoutes from "./sub-category/sub-category.router";
import PaymentModeRoutes from "./payment-mode/payment-mode.router";
import { createExpenseTransactionHandler } from "./expense-transaction.controller";
import { createExpenseTransactionSchema } from "./expense-transaction.schema";
import { validateResource } from "../../../middlewares/validate-resource.middleware";
import { errorWrapper } from "../../../middlewares/error-wrapper.middleware";

const router = Router();

router.use("/categories", ExpenseCategoriesRoutes);
router.use("/sub-categories", ExpenseSubCategoriesRoutes);
router.use("/payment-modes", PaymentModeRoutes);

router.get("/:id");
router.get("/:userId");

router.post(
  "/",
  validateResource(createExpenseTransactionSchema),
  errorWrapper(createExpenseTransactionHandler)
);

router.patch("/:id");

router.delete("/:id");

export default router;
