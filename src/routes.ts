import express, { Application } from "express";
import { testConnection, resetDatabase } from "./controllers/health";
import { login, register } from "./controllers/auth";
import { getMyself } from "./controllers/user";
import { authenticate } from "./middleware/auth";

export const attachPublicRoutes = (app: Application): void => {
  if (process.env.NODE_ENV === "development") {
    app.get("/reset", resetDatabase);
  }

  app.get("/health", testConnection);

  app.post("/register", register);
  app.post("/login", login);
};

export const attachPrivateRoutes = (app: Application): void => {
  app.get("/me", authenticate, getMyself);
};
