import jwt from "jsonwebtoken";
import { Types } from "mongoose";
// import { IForgotPasswordToken } from "../../types/token.types.js";

const generateForgotPasswordToken = (id, email, isAdmin) => {
  if (!process.env.SECRET_KEY) {
    console.log("JWT key is undefined");
    throw new Error("JWT SECRET_KEY key not defined");
  }

  const tokenBody = {
    id,
    email,
    isAdmin,
  };

  // Time the token is valid for
  const expiryTimeInMilliseconds = 10 * 60 * 1000;

  const token = jwt.sign(tokenBody, process.env.SECRET_KEY, {
    expiresIn: expiryTimeInMilliseconds / 1000, // Convert to seconds
  });

  if (!token) throw new Error("Could not generate forgot password token");
  return token;
};

export default generateForgotPasswordToken;
