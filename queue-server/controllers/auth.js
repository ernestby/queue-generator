import db from "../models/user";
import { io } from "../config/socket";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { MODERATOR_GROUP_ID, JWT_SECRET } from "../config/constants";

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

class auth {
  getUsergroups(req, res) {
    db.getUserGroups().then((result) => res.send(result));
  }

  getCurrentUser(req, res) {
    db.getCurrentUser(req.user.id).then((result) => res.send(result));
  }

  async registration(req, res) {
    const errors = validationResult(req);
    const { username, password, fullname } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Field is empty", errors });
    }

    const users = await db.getUsers();
    // Registration is available only once in order to register a moderator.
    if (users.length) {
      return res.status(400).json({ message: "Registration is not allowed" });
    }

    const existsUser = await db.getUserByUsername(username);
    if (existsUser.length) {
      return res.status(400).json({ message: "Username is exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 5);
    const user = {
      username,
      password: hashPassword,
      fullname,
      group_id: MODERATOR_GROUP_ID,
      state: "break",
    };

    await db.saveUser(user);

    return res.status(200).json({ message: "Successful registration" });
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: "Username does not exists" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "You entered an incorrect password" });
    }
    const token = generateAccessToken(user.id, user.username);
    return res.json({ token });
  }
}

module.exports = new auth();
