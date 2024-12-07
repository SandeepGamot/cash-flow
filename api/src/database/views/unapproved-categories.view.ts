import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  name: "unapproved_expense_categories",
  expression: `
    SELECT id, category
    FROM expense_category
    WHERE "isApproved" = false
  `,
})
export class UnapprovedExpenseCategories {
  @ViewColumn()
  id: string;

  @ViewColumn()
  category: string;
}
