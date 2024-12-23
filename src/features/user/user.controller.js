import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  static signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = UserModel.signUp(name, email, password);

      let dummy = {
        name: user.name,
        email: user.email,
        id: user.id,
      };

      res
        .status(201)
        .json({ message: "User created successfully", user: dummy });
    } catch (error) {
      next(error);
    }
  }

  static signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = UserModel.signIn(email, password);

      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        "i+r1+yG&dC'y0ZL|}id7P().QAWi'e",
        { expiresIn: "1h" }
      );

      res.status(200).json({ token, message: "User logged in successfully" });
    } catch (error) {
      next(error);
    }
  }
}
