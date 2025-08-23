// Import the model
import AppError from '../../errors/AppError';
import CourseModel from '../course/course.model';
import EnrollmentModel from '../enrollment/enrollment.model';
import LectureModel from '../lecture/lecture.model';
import { TUserProgress } from './user-progress.interface';
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

// Service function to retrieve multiple userProgress based on query parameters.
const markNewProgress = async (
  userId: string,
  payload: Omit<TUserProgress, 'userId' | 'isCompleted'>
) => {
  const existingCourse = await CourseModel.findById(payload.courseId);

  if (!existingCourse) {
    throw new AppError(404, 'Course Not Found');
  }

  const existingLecture = await LectureModel.findById(payload.lectureId);

  if (!existingLecture) {
    throw new AppError(404, 'Lecture Not Found');
  }

  const enrollment = await EnrollmentModel.findOne({
    userId,
    courseId: payload.courseId,
  });

  if (!enrollment) {
    throw new AppError(400, 'You Are Not Enrolled In This Course');
  }

  const nextLecture =
    (await LectureModel.findOne({
      lectureNumber: existingLecture.lectureNumber++,
    })) || null;

  const existingProgress = await UserProgressModel.findOne({
    userId,
    courseId: payload.courseId,
    lectureId: payload.lectureId,
    isCompleted: true,
  });
  if (existingProgress) {
    throw new AppError(400, 'You Have Already Completed This Lecture');
  }
  const data = {
    userId,
    isCompleted: true,
    nextLecture,
    ...payload,
  };
  return await UserProgressModel.create(data);
};

export const userProgressServices = {
  createUserProgress,
  getUserProgressById,
  getAllUserProgress,
  markNewProgress,
};
