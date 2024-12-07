import { RequestHandler } from "express";
import { CreateExpenseTransactionInput } from "./expense-transaction.schema";
import dataSource from "../../../database/data-source";
import { User } from "../../users/user.entity";
import { ExpenseTransaction } from "./expense-transaction.entity";
import { ExpenseCategoryRepository } from "./category/category.repository";
import { ExpenseSubCategoryRepository } from "./sub-category/sub-category.repository";
import { PaymentModeRepository } from "./payment-mode/payment-mode.repository";

export const createExpenseTransactionHandler: RequestHandler<
  unknown,
  unknown,
  CreateExpenseTransactionInput
> = async (req, res) => {
  const { amount, category, subCategory, paymentMode, description } = req.body;
  const createdExpenseTransaction =
    await dataSource.transaction<ExpenseTransaction>(async (entityManager) => {
      const expenseCategoryRepo = entityManager.withRepository(
        ExpenseCategoryRepository
      );
      const expenseSubCategoryRepo = entityManager.withRepository(
        ExpenseSubCategoryRepository
      );
      const paymentModeRepo = entityManager.withRepository(
        PaymentModeRepository
      );

      const expenseCategory = await expenseCategoryRepo.findOrCreate(category);
      const expenseSubCategory = await expenseSubCategoryRepo.findOrCreate(
        subCategory
      );
      const expensePaymentMode = await paymentModeRepo.findOrCreate(
        paymentMode
      );

      const expenseTransaction = new ExpenseTransaction();
      expenseTransaction.amount = amount;
      expenseTransaction.description = description;
      expenseTransaction.category = expenseCategory;
      expenseTransaction.subCategory = expenseSubCategory;
      expenseTransaction.paymentMode = expensePaymentMode;
      expenseTransaction.createdBy = req.user!;
      await entityManager.save(expenseTransaction);
      return expenseTransaction;
    });
  return res.status(201).send(createdExpenseTransaction);
};
