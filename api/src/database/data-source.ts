import { DataSource } from "typeorm";
import { AppConfig } from "../config";
import { User } from "../core/users/user.entity";
import { ExpenseTransaction } from "../core/user-transactions/expense/expense-transaction.entity";
import { ExpenseCategory } from "../core/user-transactions/expense/category/category.entity";
import { ExpenseSubCategory } from "../core/user-transactions/expense/sub-category/sub-category.entity";
import { PaymentMode } from "../core/user-transactions/expense/payment-mode/payment-mode.entity";
import { UnapprovedExpenseCategories } from "../core/user-transactions/expense/category/views/unapproved-categories.view";
import { UnapprovedExpenseSubCategories } from "../core/user-transactions/expense/sub-category/views/unapproved-sub-categories.view";
import { UnapprovedPaymentMode } from "../core/user-transactions/expense/payment-mode/views/unapproved-payment-mode.view";

export default new DataSource({
  type: "postgres",
  host: AppConfig.db.host,
  port: Number(AppConfig.db.port || 5432),
  username: AppConfig.db.username,
  password: AppConfig.db.password,
  database: AppConfig.db.database,
  entities: [
    // user
    User,
    // expense-specifc
    ExpenseTransaction,
    ExpenseCategory,
    ExpenseSubCategory,
    PaymentMode,
    // views
    UnapprovedExpenseCategories,
    UnapprovedExpenseSubCategories,
    UnapprovedPaymentMode,
  ],
  // logging: true,
  migrations: ["src/database/migrations/**"],
  synchronize: true,
});
