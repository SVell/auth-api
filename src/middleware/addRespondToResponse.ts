import { RequestHandler } from "express";

const addRespondToResponse: RequestHandler = (_req, res, next) => {
  res.respond = (data: any, message = "Success"): void => {
    res.status(200).send({ data, message });
  };
  next();
};

export default addRespondToResponse;
