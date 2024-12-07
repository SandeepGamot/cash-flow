import { BeforeUpdate, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

export abstract class TransactionAuditProperties {
  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  createdBy: User;

  @Column({
    type: "timestamp",
    nullable: true,
    default: null,
  })
  updatedAt: Date | null;

  @ManyToOne((type) => User, (user) => user.id, {
    nullable: true,
  })
  updatedBy: User | null;

  @BeforeUpdate()
  insertUpdatedAt() {
    this.updatedAt = new Date();
  }
}
