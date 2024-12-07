import dataSource from "../../../../database/data-source";
import { normalise } from "../../../../utils/methods";
import { ExpenseCategory } from "./category.entity";
import { ExpenseCategoryInput } from "./category.schema";

export const ExpenseCategoryRepository = dataSource
  .getRepository(ExpenseCategory)
  .extend({
    async findOrCreate({ id, category: categoryInput }: ExpenseCategoryInput) {
      let category: ExpenseCategory | null;

      category = await this.createQueryBuilder("category")
        .where("category.id = :id", { id })
        .orWhere("category.category = :category", {
          category: normalise(categoryInput),
        })
        .getOne();

      if (!category) {
        if (id) {
          throw new Error(`category with id: ${id} does not exist`);
        }
        category = this.create({ category: categoryInput });
        await this.insert(category);
      }
      return category;
    },
  });
