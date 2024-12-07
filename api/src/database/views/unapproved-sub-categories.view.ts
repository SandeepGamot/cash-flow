import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  name: "unapproved_expense_sub_categories",
  expression: `
    SELECT id, "subCategory"
    FROM expense_sub_category
    WHERE "isApproved" = false
  `,
})
export class UnapprovedExpenseSubCategories {
  @ViewColumn()
  id: string;

  @ViewColumn()
  subCategory: string;
}
