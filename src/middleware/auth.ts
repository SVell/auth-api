import { User } from "../Models/User";
import { AuthorizationError, catchErrors } from "../errors";

const jwt = require("jsonwebtoken");

export const authenticate = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AuthorizationError(
      "Authorization token is valid, but User not found"
    );
  }

  req.user = user;
  next();
});
