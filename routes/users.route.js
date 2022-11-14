import express from "express";
import { CreateUser, getUserByName } from "../services/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS); // random string
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await getUserByName(username);

  if (userFromDB) {
    response.status(400).send({ Message: "Username already exists" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ Message: "Password must be at least 8 characters" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    const result = await CreateUser({
      username: username,
      password: hashedPassword,
    });
    response.send(result);
  }
});

router.post("/login", async function (request, response) {
    const { username, password } = request.body;
    const userFromDB = await getUserByName(username);
  
    if (!userFromDB) {
      response.status(400).send({ Message: "Invalid Credentials" });
    } else {
        const storedDBPassword = userFromDB.password;
        const isPasswordMatch = await bcrypt.compare(password, storedDBPassword);
        if(isPasswordMatch){
            const token = jwt.sign({id : userFromDB._id}, process.env.SECRET_KEY);
            response.send({ Message: "Login Successful" , token : token}); 
        } else {
            response.status(401).send({ Message: "Invalid Credentials" });
        }
    }
  });
export default router;
