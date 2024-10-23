import User from "../Models/userModels.js";
import bcrypt from "bcrypt";
import blacklist from "../Models/blacklists.js";


import { SECRET_ACCESS_TOKEN } from "../Config/config.js";

export async function Register(req, res) {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    // create an instance of a user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    const savedUser = await newUser.save(); // save new user into the database
    console.log(savedUser);
    const { ...user_data } = savedUser._doc;
    res.status(200).json({
      status: "success",

      data: [user_data],
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
}

// export async function Login (req, res) {
//     const { email, password } = req.body;

//     console.log(password);

//     try {
//         const user = await User.findOne({email}).select("+password");
//         console.log(user);
//         if(!user){
//             res.status(401).json({
//                 status: "Failed",
//                 message: "Invalid email or password"
//             })
//         }

//         console.log(user.password);
//         console.log(password);

//         const isPasswordValid = await bcrypt.compare(
//             password,
//             user.password,
//         )

//         if (!isPasswordValid) {
//             return res.status(401).json({
//             status: "failed",
//             data: {},
//             message: "Invalid email or password.",
//             });
//         }

//         //generate The JWt
//         const token = user.generateAccessJWT();

//         const { password: pwd, ...userData } = user._doc;

//         res.status(200).json({
//             status: "success",
//             message: "You have successfully logged in.",
//             token: `${token}`,
//             user: userData,
//           });

//     } catch(error){
//         res.status(500).json({
//             status: "error",
//             code: 500,
//             message: "Internal Server Error inn the code",
//           });
//     }
// }

export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email }).select("+password");

    console.log(user);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        data: {},
        message: "Invalid email or password.",
      });
    }

    // Validate password

    console.log(password);
    console.log(user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);
    
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
        return res.status(401).json({
            status: "failed",
            data: {},
            message: "Invalid email or password.",
        });
    }
    
    console.log("Before everything");
    // Generate JWT

    // Return token and user info


    const token = user.generateAccessJWT();

    // if (latestToke != token){
    //   latestToke = token;
    // }

    // latestToke = token;
    // console.log("it is not working");

    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      token: `${token}`,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error inn the code",
    });
  }
}

export async function Logout(req, res) {
  try { 
    const authHeader = req.headers['authorization']; 
    if (!authHeader) return res.sendStatus(204); 
    const bearerToken = authHeader.split(' ')[1]; 
    const checkIfBlacklisted = await blacklist.findOne({ token: bearerToken });
    console.log("extracted token",   bearerToken);
    if (checkIfBlacklisted) return res.sendStatus(204);
    const newBlacklist = new blacklist({
      token: bearerToken,
    });

    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader('Clear-Site-Data', '"cookies"');
    res.status(200).json({ message: 'You are logged out!' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
}


