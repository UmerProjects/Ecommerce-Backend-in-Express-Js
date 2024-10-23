import jwt from "jsonwebtoken"
import { SECRET_ACCESS_TOKEN } from "../Config/config.js";
import blacklist from "../Models/blacklists.js";
import User from "../Models/userModels.js";

export default async function adminVerification(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }

    const   bearerToken = authHeader.split(" ")[1];

    const checkIfBlacklisted = await blacklist.findOne({ token: bearerToken });

    if (checkIfBlacklisted) {
      return res.status(401).json({
        message: "This session has been expired please login again",
      });
    }

    try {
      const decoded = jwt.verify(bearerToken, SECRET_ACCESS_TOKEN);
      const user = await User.findById(decoded.id);
      // console.log(user);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token." });
    }
  //   jwt.verify(bearerToken, SECRET_ACCESS_TOKEN, async (err, decoded) => {
  //     console.log("Decoded JWT: ", decoded);

  //     if (err) {
  //       return res.status(401).json({
  //         message: "This session has been expired",
  //       });
  //     }
  //     if (!decoded) {
  //       return res.status(401).json({
  //         message: "The decoded is not working",
  //       });
  //     }

      
  //   });
  //   req.user = user;
  //     next();

  //   console.error("Error in token verification", error)
  //   res.status(500).json({
  //     status: "error",
  //     code: 500,
  //     message: "The admin is not verifying"
  //   })
  // }
  }
