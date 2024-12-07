import { TypeOf, string, object } from "zod";
import { AppConfig } from "../../../../config";

export const subCategorySchema = object({
  id: string().uuid().optional(),
  subCategory: string().max(AppConfig.constants.options.maxLength),
}).refine(
  (data) => data.id != null || data.subCategory != null,
  "sub-category should either have id or a name"
);

export type ExpenseSubCategoryInput = TypeOf<typeof subCategorySchema>;
