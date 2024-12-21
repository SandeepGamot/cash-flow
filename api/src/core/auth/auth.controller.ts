import { RequestHandler } from "express";
import { googleService } from "./google/google.service";
import { HTTP } from "../../constants/http-codes";
import { userService } from "../users/user.service";
import jsonwebtoken from "jsonwebtoken";
import { AppConfig } from "../../config";

export const googleCallbackHandler: RequestHandler = async (req, res) => {
  const code = req.query.code as string;
  const { id_token } = await googleService.exchangeTokenForCode(code);
  const data = jsonwebtoken.decode(id_token);
  if (data == null || typeof data == "string") {
    console.error("google:json", data);
    return res
      .status(HTTP.Unauthorized)
      .json({ message: "google sent a bad token; resolved to null or string" });
  }
  const { email, given_name, family_name } = data;
  let user = await userService.findByEmail(email);
  if (!user) {
    user = await userService.create({
      email,
      firstName: given_name,
      lastName: family_name,
      role: 1,
    });
  }
  const jwt = jsonwebtoken.sign(
    { sub: user.id },
    AppConfig.jwt.secret as string,
    {
      expiresIn: "24h",
    }
  );
  res.cookie("accessToken", jwt, {
    httpOnly: true,
    domain: "localhost",
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.redirect(AppConfig.origin.url);
};
