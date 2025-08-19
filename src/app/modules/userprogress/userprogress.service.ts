// Import the model
import UserprogressModel from './userprogress.model'; 

// Service function to create a new userprogress.
const createUserprogress = async (data: object) => {
  const newUserprogress = await UserprogressModel.create(data);
  return newUserprogress;
};


// Service function to retrieve a single userprogress by ID.
const getUserprogressById = async (id: string) => {
  return await UserprogressModel.findById(id);
};

// Service function to retrieve multiple userprogress based on query parameters.
const getAllUserprogress = async (query: object) => {
  return await UserprogressModel.find(query);
};

export const userprogressServices = {
  createUserprogress,
  getUserprogressById,
  getAllUserprogress,
};