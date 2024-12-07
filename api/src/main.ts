import express, { NextFunction, Request, Response } from "express";
import { AppConfig, initConfig } from "./config";
import cors from "cors";
import dataSource from "./database/data-source";
import router from "./routes";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

function bootstrap() {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: [AppConfig.origin.url],
      credentials: true,
    })
  );
  app.use(router);
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).send({ error: "something went wrong on the server" });
  });
  app.listen(AppConfig.port, () => {
    console.info(`running on ${AppConfig.port}`);
  });
}

initConfig();
dataSource
  .initialize()
  .then(() => {
    console.info("db conn successful");
    bootstrap();
  })
  .catch(console.error);
