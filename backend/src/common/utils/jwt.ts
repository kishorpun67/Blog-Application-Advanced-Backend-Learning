import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};