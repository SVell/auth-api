import { User } from "../Models/User";
import { catchErrors } from "../errors";

export const getMyself = catchErrors(async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res
    .status(200)
    .json({ username: user.username, email: user.email, date: user.createdAt });
});
