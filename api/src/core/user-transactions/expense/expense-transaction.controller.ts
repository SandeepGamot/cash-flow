import { RequestHandler } from "express";
import {
  CreateExpenseTransactionInput,
  ExpenseTransactionListQuery,
} from "./expense-transaction.schema";
import { expenseTransactionService } from "./expense-transaction.service";
import dataSource from "../../../database/data-source";
import { ExpenseTransaction } from "./expense-transaction.entity";

export const getExpenseTransactionAggegateHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  ExpenseTransactionListQuery
> = async (req, res) => {
  const { start_date, end_date, user } = req.query;

  const query = dataSource
    .getRepository(ExpenseTransaction)
    .createQueryBuilder("expense")
    .select("SUM(expense.amount)", "totalAmount")
    .where("expense.createdAt BETWEEN :start_date AND :end_date", {
      start_date,
      end_date,
    });

  if (user) {
    query.andWhere("expense.createdBy = :user", { user });
  }

  const { totalAmount } = await query.getRawOne();
  res.status(200).json({ totalAmount });
};

export const getExpenseTransactionListHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  ExpenseTransactionListQuery
> = async (req, res) => {
  const { start_date, end_date, user, page, limit } = req.query;

  const query = dataSource
    .getRepository(ExpenseTransaction)
    .createQueryBuilder("expense")
    .where("expense.createdAt BETWEEN :start_date AND :end_date", {
      start_date,
      end_date,
    });

  if (user) {
    query.andWhere("expense.createdBy = :user", { user });
  }
  query.skip(page * limit);
  query.take(limit);

  const [transactions, total] = await query.getManyAndCount();
  res.json({ transactions, total });
};

export const createExpenseTransactionHandler: RequestHandler<
  unknown,
  unknown,
  CreateExpenseTransactionInput
> = async (req, res) => {
  return res
    .status(201)
    .send(await expenseTransactionService.create(req.body, req.user!));
};
