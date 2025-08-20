// Import the model
import AppError from '../../errors/AppError';
import CourseModel from '../course/course.model';
import { TModule } from './module.interface';
import ModuleModel from './module.model';

// Service function to create a new module.
const createModule = async (data: TModule) => {
  const course = await CourseModel.findOne({ _id: data?.courseId });
  if (!course) {
    throw new AppError(404, 'Course not found');
  }
  const moduleExist = await ModuleModel.findOne({
    title: data.title,
    courseId: data.courseId,
  });
  if (moduleExist) {
    throw new AppError(400, 'Module With This Title Already Exist');
  }
  const existedModule = await ModuleModel.find({
    courseId: data.courseId,
  });
  const moduleNumber = existedModule.length + 1;
  console.log(existedModule?.length, moduleNumber, 'moduleNumber');
  data.moduleNumber = moduleNumber;
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

