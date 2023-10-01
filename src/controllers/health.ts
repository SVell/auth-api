import { resetDb } from "../db/reserDb";
import { catchErrors } from "../errors";

export const testConnection = catchErrors(async (req, res) => {
  res.respond({}, "Server is working");
});

export const resetDatabase = catchErrors(async (req, res) => {
  await resetDb();
  res.respond({}, "DB Reset");
});
