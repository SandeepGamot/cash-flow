import dataSource from "../../../../database/data-source";
import { UnapprovedExpenseSubCategories } from "./views/unapproved-sub-categories.view";
import { ExpenseSubCategory } from "./sub-category.entity";

const getUnapprovedSubCategories = async () => {
  return dataSource.getRepository(UnapprovedExpenseSubCategories).find();
};

const getSubCategories = async () => {
  return dataSource.getRepository(ExpenseSubCategory).find({
    where: { isApproved: true },
  });
};

export const expenseSubCategoryService = {
  getUnapprovedSubCategories,
  getSubCategories,
};
