import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (
  jwtPayload: { id: string | Types.ObjectId; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as any,
  });
};

export default generateToken;
