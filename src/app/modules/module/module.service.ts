// Import the model
import ModuleModel from './module.model'; 

// Service function to create a new module.
const createModule = async (data: object) => {
  const newModule = await ModuleModel.create(data);
  return newModule;
};


// Service function to retrieve a single module by ID.
const getModuleById = async (id: string) => {
  return await ModuleModel.findById(id);
};

// Service function to retrieve multiple module based on query parameters.
const getAllModule = async (query: object) => {
  return await ModuleModel.find(query);
};

export const moduleServices = {
  createModule,
  getModuleById,
  getAllModule,
};