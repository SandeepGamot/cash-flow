import dataSource from "../../../../database/data-source";
import { normalise } from "../../../../utils/methods";
import { ExpenseSubCategory } from "./sub-category.entity";
import { ExpenseSubCategoryInput } from "./sub-category.schema";

export const ExpenseSubCategoryRepository = dataSource
  .getRepository(ExpenseSubCategory)
  .extend({
    async findOrCreate({
      id,
      subCategory: subCategoryInput,
    }: ExpenseSubCategoryInput) {
      let subCategory: ExpenseSubCategory | null;
      subCategory = await this.createQueryBuilder("subCategory")
        .where("subCategory.id = :id", { id })
        .orWhere("subCategory.subCategory = :subCategory", {
          subCategory: normalise(subCategoryInput),
        })
        .getOne();
      if (!subCategory) {
        if (id) {
          throw new Error(`subCategory with id: ${id} does not exist`);
        }
        subCategory = this.create({ subCategory: subCategoryInput });
        await this.insert(subCategory);
      }
      return subCategory;
    },
  });
