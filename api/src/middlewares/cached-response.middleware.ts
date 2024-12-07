import { RequestHandler } from "express";

export const cachedResponse: (configString: string) => RequestHandler =
  (configString: string) => (_, res, next) => {
    res.header("Cache-Control", configString);
    next();
  };
