// Import the model
import AppError from '../../errors/AppError';
import { TCourse } from './course.interface';
import CourseModel from './course.model';

// Service function to create a new course.
const createCourse = async (data: TCourse) => {
  const course = await CourseModel.findOne({ title: data.title });
  if (course) {
    throw new AppError(400, 'Course for this topic already exist');
  }
  const newCourse = await CourseModel.create(data);
  return newCourse;
};

// Service function to retrieve a single course by ID.
const getCourseById = async (id: string) => {
  return await CourseModel.findById(id);
};

// Service function to retrieve multiple course based on query parameters.
const getAllCourse = async (query: object) => {
  return await CourseModel.find(query);
};

export const courseServices = {
  createCourse,
  getCourseById,
  getAllCourse,
};

