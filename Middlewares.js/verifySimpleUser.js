import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../Config/config.js";
import blacklist from "../Models/blacklists.js";
import User from "../Models/userModels.js";

export default async function userVerification(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const bearerToken = authHeader.split(" ")[1];

  const checkIfBlacklisted = await blacklist.findOne({ token: bearerToken });

  if (checkIfBlacklisted) {
    return res.status(401).json({
      message: "This session has been expired please login again",
    });
  }

  try {
    const decoded = jwt.verify(bearerToken, SECRET_ACCESS_TOKEN);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "user") {
      return res.status(403).json({
        message: "Forbidden, user access required hahahah",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
}
