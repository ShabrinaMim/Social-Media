import express from "express";
import { signUpUser, signInUser } from "../controllers/auth.js"; //we have to write module-name.js

const routerAuth = express.Router();

routerAuth.post("/signup", signUpUser);
routerAuth.post("/signin", signInUser);

export default routerAuth;
