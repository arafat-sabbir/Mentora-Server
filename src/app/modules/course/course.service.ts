// Import the model
import CourseModel from './course.model'; 

// Service function to create a new course.
const createCourse = async (data: object) => {
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