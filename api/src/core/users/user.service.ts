import { scryptSync } from "crypto";
import dataSource from "../../database/data-source";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

const userRepo = dataSource.getRepository(User);

const create = async (createUserDto: CreateUserDto) => {
  const { username, password } = createUserDto;
  console.log("smg:", { username, password });
  const user = userRepo.create({
    username,
    password: scryptSync(password, "salt", 64).toString("hex"),
  });
  console.log("smg:", { user });
  await userRepo.insert(user);
  return user;
};

const login = async (createUserDto: CreateUserDto) => {
  const { username, password } = createUserDto;
  const user = await userRepo.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = scryptSync(password, "salt", 64).toString("hex");

  if (user.password !== hashedPassword) {
    throw new Error("Invalid password");
  }

  return user;
};

const findByUsername = async (username: string) => {
  return await userRepo.findOne({
    where: {
      username,
    },
  });
};

export const userService = {
  create,
  findByUsername,
  login,
};
