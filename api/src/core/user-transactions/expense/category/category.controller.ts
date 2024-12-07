import { RequestHandler } from "express";
import { expenseCategoryService } from "./category.service";

export const getCatgoriesHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  { unapprovedOnly?: string }
> = async (req, res) => {
  if (req.query.unapprovedOnly && req.query.unapprovedOnly === "true") {
    return res.send(await expenseCategoryService.getUnapprovedCategories());
  }
  return res.send(await expenseCategoryService.getCategories());
};
