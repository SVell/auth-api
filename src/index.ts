import { attachPrivateRoutes, attachPublicRoutes } from "./routes";
import { RouteNotFoundError } from "./errors";
import { createDbConnection } from "./db/createDbConnection";
import addRespondToResponse from "./middleware/addRespondToResponse";

const express = require("express");
const body = require("body-parser");

const initExpress = async () => {
  const app = express();

  app.use(express.json());

  app.use(addRespondToResponse);

  attachPublicRoutes(app);
  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));

  await createDbConnection(app, body);

  app.listen(process.env.PORT || 8000);
  console.log(
    `App started at url: ${process.env.BASE_URL}:${process.env.PORT || 8000}`
  );
};

const initApp = async () => {
  require("dotenv").config();
  initExpress();
};

initApp();
