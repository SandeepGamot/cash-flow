import dataSource from "../../database/data-source";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

const userRepo = dataSource.getRepository(User);

const create = async (createUserDto: CreateUserDto) => {
  const user = userRepo.create(createUserDto);
  await userRepo.insert(user);
  return user;
};

const findByEmail = async (email: string) => {
  return await userRepo.findOneBy({ email });
};

const findById = async (id: string) => {
  return await userRepo.findOneBy({ id });
};

export const userService = {
  create,
  findByEmail,
  findById,
};
