// Import the model
import UserProgressModel from './user-progress.model';

// Service function to create a new userProgress.
const createUserProgress = async (data: object) => {
  const newUserProgress = await UserProgressModel.create(data);
  return newUserProgress;
};

// Service function to retrieve a single userProgress by ID.
const getUserProgressById = async (id: string) => {
  return await UserProgressModel.findById(id);
};

// Service function to retrieve multiple userProgress based on query parameters.
const getAllUserProgress = async (query: object) => {
  return await UserProgressModel.find(query);
};

export const userProgressServices = {
  createUserProgress,
  getUserProgressById,
  getAllUserProgress,
};
