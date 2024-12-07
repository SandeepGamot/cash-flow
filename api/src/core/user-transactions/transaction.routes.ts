import { Router } from "express";
import ExpenseTransactionRouter from "./expense/expense-transaction.router";
const router = Router();

router.use("/expenses", ExpenseTransactionRouter);

export default router;
