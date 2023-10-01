import { RequestHandler } from "express";

type ErrorData = { [key: string]: any };
export type ErrorCode = number | string;

export enum Status {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export class CustomError extends Error {
  constructor(
    public message: string = "",
    public code: ErrorCode = "Internal Server Error",
    public status: number = Status.INTERNAL_ERROR,
    public data: ErrorData = {}
  ) {
    super();
  }
}

export class BadRequestError extends CustomError {
  constructor(errorData: ErrorData, message = "Errors during validation") {
    super(message, "Bad Request", Status.BAD_REQUEST, errorData);
  }
}

export class AuthorizationError extends CustomError {
  constructor(message = "Authentication token is invalid") {
    super(message, "Unauthorized", Status.UNAUTHORIZED);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entity: string) {
    super(`Entity '${entity}' not found`, "Entity Not Found", Status.NOT_FOUND);
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl: string) {
    super(`Route '${originalUrl}' does not exist.`, "Route Not Found", 404);
  }
}

export const catchErrors =
  (requestHandler: RequestHandler): RequestHandler =>
  async (req, res, next): Promise<any> => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
