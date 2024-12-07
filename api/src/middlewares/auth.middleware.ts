import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../core/users/user.entity";
import { HTTP } from "../constants/http-codes";
import { verify } from "jsonwebtoken";
import { AppConfig } from "../config";
import { userService } from "../core/users/user.service";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    return res.status(HTTP.Unauthorized).json({ message: "cookies missing" });
  }
  const token = req.cookies["accessToken"];
  if (!token) {
    return res
      .status(HTTP.Unauthorized)
      .json({ message: "property 'accessToken' missing from cookies" });
  }
  const { sub: userId } = verify(token, AppConfig.jwt.secret as string);

  if (!userId) {
    return res.status(HTTP.Unauthorized).send({ message: "invalid token" });
  }

  const user = await userService.findById(userId as string);

  if (!user) {
    return res
      .status(HTTP.Unauthorized)
      .json({ message: "no user found for this id" });
  }
  req.user = user;

  next();
};
