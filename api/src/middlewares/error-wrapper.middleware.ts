import { NextFunction, Request, RequestHandler, Response } from "express";

export const errorWrapper =
  (handler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
