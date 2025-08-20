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

// Service function to update a course by ID.

const updateCourse = async (id: string, data: TCourse) => {
  const payload: Record<string, any> = {};

  const courseExist = await CourseModel.findById(id);
  if (!courseExist) {
    throw new AppError(404, 'Course Not Found');
  }
  Object.entries(data).forEach(([key, value]) => {
    if (value && value !== '') {
      payload[key] = value;
    }
  });

  const course = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return course;
};

// Service function to retrieve a single course by ID.
const getCourseById = async (id: string) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new AppError(404, 'Course Not Found');
  }
  return course;
};

// Service function to retrieve single course based on query parameters.
const getAllCourse = async (query: object) => {
  return await CourseModel.find(query);
};

// Service function to retrieve single course based on query parameters.
const deleteCourse = async (id: string) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new AppError(404, 'Course Not Found');
  }
  return await CourseModel.deleteOne({ _id: id });
};

export const courseServices = {
  createCourse,
  getCourseById,
  getAllCourse,
  updateCourse,
  deleteCourse,
};

