import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "User is not logged in" });
    }
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (e) {
    return res.status(403).json({ message: "User is not logged in" });
  }
};
