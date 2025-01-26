import dataSource from "../../../../database/data-source";
import { UnapprovedExpenseCategories } from "./views/unapproved-categories.view";
import { ExpenseCategory } from "./category.entity";

const getUnapprovedCategories = async () => {
  return dataSource.getRepository(UnapprovedExpenseCategories).find();
};

const getCategories = async () => {
  return dataSource.getRepository(ExpenseCategory).find({
    where: { isApproved: true },
  });
};

export const expenseCategoryService = {
  getUnapprovedCategories,
  getCategories,
};
