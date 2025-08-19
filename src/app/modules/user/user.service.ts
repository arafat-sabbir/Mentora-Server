// Import the model
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import UserModel from './user.model';

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
const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

// Service function to retrieve multiple user based on query parameters.
const getAllUser = async (query: object) => {
  return await UserModel.find(query);
};

export const userServices = {
  createUser,
  getUserById,
  getAllUser,
};
