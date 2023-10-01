import { User } from "../Models/User";
import { catchErrors } from "../errors";

const jwt = require("jsonwebtoken");

export const register = catchErrors(async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });
  await user.save();
  res.respond({}, "User created successfully");
});

export const login = catchErrors(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1 hour",
  });

  res.status(200).json({ token });
});
