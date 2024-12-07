import { TypeOf, string, object } from "zod";
import { AppConfig } from "../../../../config";

export const categorySchema = object({
  id: string().uuid().optional(),
  category: string().max(AppConfig.constants.options.maxLength),
}).refine(
  (data) => data.id != null || data.category != null,
  "category should either have id or a name"
);

export type ExpenseCategoryInput = TypeOf<typeof categorySchema>;
