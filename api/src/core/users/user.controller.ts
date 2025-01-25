import { RequestHandler } from "express";
import { HTTP } from "../../constants/http-codes";
import { CreateUserDto } from "./dto/create-user.dto";
import jsonwebtoken from "jsonwebtoken";
import { AppConfig } from "../../config";
import { userService } from "./user.service";

export const verifyUserHandler: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(HTTP.Unauthorized).json({ message: "user missing" });
  }
  res.json({ user: req.user });
};

export const registerUserHandler: RequestHandler<
  null,
  null,
  CreateUserDto,
  null
> = async (req, res) => {
  try {
    await userService.create(req.body);
    res.sendStatus(HTTP.Created);
  } catch (error: any) {
    res.status(500).json(error);
  }
};

export const loginUserHandler: RequestHandler<
  null,
  null,
  CreateUserDto,
  null
> = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    const jwt = jsonwebtoken.sign(
      { sub: user.username },
      AppConfig.jwt.secret as string,
      { expiresIn: "30d" }
    );
    res.cookie("accessToken", jwt, {
      httpOnly: true,
      domain: AppConfig.origin.domain,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.sendStatus(HTTP.OK);
  } catch (error: any) {
    res.status(HTTP.Unauthorized).json(error);
  }
};

