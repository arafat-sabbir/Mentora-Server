// Import the model
import config from '../../config';
import AppError from '../../errors/AppError';
import generateToken from '../../utils/generateToken';
import { TUser } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

// Service function to create a new user.
const createUser = async (data: TUser) => {
  const { email } = data;
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    throw new AppError(400, 'User with this email already exist');
  }
  await UserModel.create(data);
  return {};
};

// Service function to retrieve a single user by ID.
const getCurrentUser = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  return user;
};

// Service function to retrieve multiple user based on query parameters.
const getAllUser = async (query: object) => {
  return await UserModel.find(query);
};

// Service function to login user
const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  // Find user with password field included
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, 'Incorrect Password');
  }

  // Generate JWT token
  const jwtPayload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );
  console.log('accessToken', accessToken);
  // Return user data without password and tokens
  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    user: userWithoutPassword,
    accessToken,
  };
};

export const userServices = {
  createUser,
  getCurrentUser,
  loginUser,
  getAllUser,
};
