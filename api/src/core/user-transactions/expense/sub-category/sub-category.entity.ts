import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AppConfig } from "../../../../config";
import { OptionTransformer } from "../../../../database/transformers/option.transformer";

@Entity()
export class ExpenseSubCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: AppConfig.constants.options.maxLength,
    unique: true,
    transformer: new OptionTransformer(),
  })
  subCategory: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isApproved: boolean;
}
