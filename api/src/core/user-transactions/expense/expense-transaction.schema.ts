import { TypeOf, number, string, object } from "zod";
import { AppConfig } from "../../../config";
import { categorySchema } from "./category/category.schema";
import { subCategorySchema } from "./sub-category/sub-category.schema";
import { paymentModeSchema } from "./payment-mode/payment-mode.schema";

const { amount, description } = AppConfig.constants;

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
