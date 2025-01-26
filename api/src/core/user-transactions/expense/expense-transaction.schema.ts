import { TypeOf, number, string, object } from "zod";
import { AppConfig } from "../../../config";
import { categorySchema } from "./category/category.schema";
import { subCategorySchema } from "./sub-category/sub-category.schema";
import { paymentModeSchema } from "./payment-mode/payment-mode.schema";

const { amount, description } = AppConfig.constants;

export const getExpenseTransactionAggregateSchema = object({
  query: object({
    start_date: string().datetime(),
    end_date: string().datetime(),
    user: string().uuid().optional(),
  }),
});

export type ExpenseTransactionAggregateQuery = TypeOf<
  typeof getExpenseTransactionAggregateSchema
>["query"];

export const getExpenseTransactionListSchema = object({
  query: getExpenseTransactionAggregateSchema.shape.query.extend({
    page: number().min(1).optional().default(1),
    limit: number().min(1).max(100).optional().default(20),
  }),
});

export type ExpenseTransactionListQuery = TypeOf<
  typeof getExpenseTransactionListSchema
>["query"];

export const createExpenseTransactionSchema = object({
  body: object({
    amount: number().min(amount.min).max(amount.max),
    description: string()
      .max(description.maxLength)
      .nullable()
      .optional()
      .default(null),
    category: categorySchema,
    subCategory: subCategorySchema,
    paymentMode: paymentModeSchema,
  }),
});

export const updateExpenseTransactionSchema = object({
  body: createExpenseTransactionSchema.shape.body.partial(),
});

export type CreateExpenseTransactionInput = TypeOf<
  typeof createExpenseTransactionSchema
>["body"];

export type UpdateExpenseTransactionInput = TypeOf<
  typeof updateExpenseTransactionSchema
>["body"];
