// Import the model
import AppError from '../../errors/AppError';
import CourseModel from '../course/course.model';
import { TEnrollment } from './enrollment.interface';
import EnrollmentModel from './enrollment.model';

// Service function to create a new enrollment.
const enrollNewStudent = async (data: Partial<TEnrollment>) => {
  const course = await CourseModel.findById(data.courseId);
  if (!course) {
    throw new AppError(404, 'Course Not Found');
  }
  const enrollmentExist = await EnrollmentModel.findOne({
    courseId: data.courseId,
    userId: data.userId,
  });
  if (enrollmentExist) {
    throw new AppError(400, 'You Are Already Enrolled In This Course');
  }
  const newEnrollment = await EnrollmentModel.create(data);
  return newEnrollment;
};

// Service function to retrieve a single enrollment by ID.
const getEnrollmentById = async (id: string) => {
  return await EnrollmentModel.findById(id);
};

// Service function to retrieve multiple enrollment based on query parameters.
const getAllEnrollment = async (query: object) => {
  return await EnrollmentModel.find(query);
};

export const enrollmentServices = {
  enrollNewStudent,
  getEnrollmentById,
  getAllEnrollment,
};

