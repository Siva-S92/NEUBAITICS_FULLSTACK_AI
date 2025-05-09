import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const isAuthorized = async (req, res, next) => {
  let token;
  if (req.header) {
    try {
      token = await req.headers["x-auth-token"];
      if (token) {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decode.id);
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export { isAuthorized };