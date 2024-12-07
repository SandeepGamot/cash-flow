import { RequestHandler } from "express";
import { HTTP } from "../../constants/http-codes";

export const verifyUserHandler: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(HTTP.Unauthorized).json({ message: "user missing" });
  }
  res.json({ user: req.user });
};
