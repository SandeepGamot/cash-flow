import dataSource from "../../../database/data-source";
import { User } from "../../users/user.entity";
import { ExpenseCategoryRepository } from "./category/category.repository";
import { ExpenseTransaction } from "./expense-transaction.entity";
import { CreateExpenseTransactionInput } from "./expense-transaction.schema";
import { PaymentModeRepository } from "./payment-mode/payment-mode.repository";
import { ExpenseSubCategoryRepository } from "./sub-category/sub-category.repository";

const getTodayExpenses = async (userId?: string) => {
  const query = dataSource
    .getRepository(ExpenseTransaction)
    .createQueryBuilder("expense")
    .where("DATE(expense.createdAt) = CURRENT_DATE");

  if (userId) {
    query.andWhere("expense.userId = :userId", { userId });
  }

  return await query.getMany();
};
const getThisWeekExpenses = async (userId?: string) => {
  const query = dataSource
    .getRepository(ExpenseTransaction)
    .createQueryBuilder("expense")
    .where("expense.createdAt >= date_trunc('week', CURRENT_DATE)")
    .andWhere(
      "expense.createdAt < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'"
    );

  if (userId) {
    query.andWhere("expense.userId = :userId", { userId });
  }
  return await query.getMany();
};

const getThisMonthExpenses = async (userId?: string) => {
  const query = dataSource
    .getRepository(ExpenseTransaction)
    .createQueryBuilder("expense")
    .where("expense.createdAt >= date_trunc('month', CURRENT_DATE)")
    .andWhere(
      "expense.createdAt < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'"
    );
  if (userId) {
    query.andWhere("expense.userId = :userId", { userId });
  }
  return await query.getMany();
};

const create = async (data: CreateExpenseTransactionInput, user: User) => {
  const { amount, category, subCategory, paymentMode, description } = data;

  return await dataSource.transaction<ExpenseTransaction>(
    async (entityManager) => {
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
      expenseTransaction.createdBy = user;
      await entityManager.save(expenseTransaction);
      return expenseTransaction;
    }
  );
};

export const expenseTransactionService = {
  create,
  getTodayExpenses,
  getThisWeekExpenses,
  getThisMonthExpenses,
};
