import { IsEmail, MinLength } from "class-validator";
import { UserRoleKey } from "../user.types";

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRoleKey;
}

export class CreateUserDto implements CreateUser {
  @MinLength(2)
  firstName: string;
  @MinLength(2)
  lastName: string;
  @IsEmail()
  email: string;
  role?: UserRoleKey;
}
