import express from 'express'
import { Login, Register, Logout } from '../Controllers/userController.js'

import Verify from '../Middlewares.js/authMiddlewares.js'

const auth = express.Router()


auth.post('/register', Register)

auth.post('/login', Login)

auth.get("/user", Verify, (req, res) => {
    const userId = req.user;
    res.json({ message: `Protected resource accessed by user ${userId}` });
  });

auth.get('/logout', Logout)

export default auth;