import { RequestHandler } from "express";

export const allowCredentials: RequestHandler = (_, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};
