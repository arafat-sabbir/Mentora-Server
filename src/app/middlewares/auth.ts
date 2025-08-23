import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import UserModel from '../modules/user/user.model';

/**
 * Middleware to authorize requests.
 * Checks if the request has a valid authorization token.
 * If not, it throws an unauthorized error.
 */

const AuthorizeRequest = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    // If no token is provided, throw an unauthorized error
    if (!token) {
      throw new AppError(401, 'Unauthorized Access No Token');
    }
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    req.user = decoded;
    const { id, role } = decoded;
    if (roles.length > 0 && !roles.includes(decoded?.role)) {
      throw new AppError(403, 'You Are Not Allowed To Access To Resource');
    }
    const user = await UserModel.findOne({ _id: id });
    if (!user && decoded.role !== role) {
      throw new AppError(404, 'User not found');
    }
    next();
  });
};

export default AuthorizeRequest;
