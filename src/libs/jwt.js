import { SECRET_TOKEN } from "../config.js";
import jwt from "jsonwebtoken";

// const SECRET_TOKEN = process.env.SECRET_TOKEN;

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_TOKEN, { expiresIn: 3600 }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
