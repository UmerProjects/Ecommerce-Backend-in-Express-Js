import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../Config/config.js";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: "Your firstname is required",
      max: 25,
    },
    last_name: {
      type: String,
      required: "Your lastname is required",
      max: 25,
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Your password is required",
      select: false,
      max: 25,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "salesman", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//     });
//   });

//   if (this.role === "admin") {
//     const adminExists = await this.constructor.findOne({ role: "admin" });
//     if (adminExists) {
//       throw new Error("Admin already exists. Cannot create another admin.");
//     }
//   }
// });


UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      this.password = await bcrypt.hash(this.password, salt); // Hash password
    }

    // Check if admin already exists before saving
    if (this.role === 'admin') {
      const adminExists = await this.constructor.findOne({ role: 'admin' });
      if (adminExists) {
        throw new Error('Admin already exists. Cannot create another admin.');
      }
    }

    next(); // Proceed to the next middleware if no issues
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

UserSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: "2h",
  });
};

export default mongoose.model("User", UserSchema);
