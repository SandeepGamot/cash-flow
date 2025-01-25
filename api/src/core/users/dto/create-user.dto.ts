import { IsEmail, MinLength } from "class-validator";
import { UserRoleKey } from "../user.types";

interface CreateUser {
  username: string;
  password: string;
  role?: UserRoleKey;
}

export class CreateUserDto implements CreateUser {
  @MinLength(2)
  username: string;
  @MinLength(2)
  password: string;
  @IsEmail()
  role?: UserRoleKey;
}
