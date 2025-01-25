import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleKey } from "./user.types";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 1 })
  role_key: UserRoleKey;

  isAdmin() {
    return this.role_key === 0;
  }
}
