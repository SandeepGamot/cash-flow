import { RequestHandler } from "express";
import { expenseSubCategoryService } from "./sub-category.service";

export const getSubCatgoriesHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  { unapprovedOnly?: string }
> = async (req, res) => {
  if (req.query.unapprovedOnly && req.query.unapprovedOnly === "true") {
    return res.send(
      await expenseSubCategoryService.getUnapprovedSubCategories()
    );
  }
  return res.send(await expenseSubCategoryService.getSubCategories());
};
