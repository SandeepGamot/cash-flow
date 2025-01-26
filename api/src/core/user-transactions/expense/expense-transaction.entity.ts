import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DecimalTransformer } from "../../../database/transformers/decimal.transformer";
import { TransactionAuditProperties } from "../transaction-audit.entity";
import { ExpenseCategory } from "./category/category.entity";
import { ExpenseSubCategory } from "./sub-category/sub-category.entity";
import { PaymentMode } from "./payment-mode/payment-mode.entity";
import { AppConfig } from "../../../config";

@Entity()
export class ExpenseTransaction extends TransactionAuditProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "numeric",
    precision: 15,
    default: "0",
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  amount: number;

  @Column({
    type: "varchar",
    length: AppConfig.constants.description.maxLength,
    nullable: true,
  })
  description: string | null;

  @ManyToOne((type) => ExpenseCategory, (category) => category.id)
  category: ExpenseCategory;

  @ManyToOne((type) => ExpenseSubCategory, (subCategory) => subCategory.id)
  subCategory: ExpenseSubCategory;

  @ManyToOne((type) => PaymentMode, (paymentMode) => paymentMode.id)
  paymentMode: PaymentMode;
}
