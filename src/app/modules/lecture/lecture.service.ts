// Import the model
import AppError from '../../errors/AppError';
import CourseModel from '../course/course.model';
import ModuleModel from '../module/module.model';
import { TLecture } from './lecture.interface';
import LectureModel from './lecture.model';

// Service function to create a new lecture.
const createLecture = async (data: TLecture) => {
  const module = await ModuleModel.findOne({ _id: data?.moduleId });
  if (!module) {
    throw new AppError(404, 'module not found');
  }
  const lectureExist = await LectureModel.findOne({
    title: data.title,
    moduleId: data.moduleId,
    videoUrl: data.videoUrl,
  });

  if (lectureExist) {
    throw new AppError(400, 'Lecture Already Exist');
  }
  const existedLecture = await LectureModel.find({
    moduleId: data.moduleId,
  });
  const lectureNumber = existedLecture.length + 1;
  console.log(existedLecture?.length, lectureNumber, 'lectureNumber');
  data.lectureNumber = lectureNumber;
  const newLecture = await LectureModel.create(data);
  return newLecture;
};

const getLectureByModule = async (moduleId: string) => {
  const module = await ModuleModel.findById(moduleId);
  if (!module) {
    throw new AppError(404, 'Module not found');
  }
  return await LectureModel.find({ moduleId });
};

// Service function to retrieve a single lecture by ID.
const getLectureById = async (id: string) => {
  return await LectureModel.findById(id);
};

// Service function to retrieve multiple lecture based on query parameters.
const getAllLecture = async (query: object) => {
  return await LectureModel.find(query);
};

const updateLecture = async (id: string, data: object) => {
  const lecture = await LectureModel.findById(id);
  if (!lecture) {
    throw new AppError(404, 'Lecture Not Found');
  }
  const payload: Record<string, unknown> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value && value !== '') {
      payload[key] = value;
    }
  });
  return await LectureModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteLecture = async (id: string) => {
  const lecture = await LectureModel.findById(id);
  if (!lecture) {
    throw new AppError(404, 'Lecture Not Found');
  }
  return await LectureModel.deleteOne({ _id: id });
};

export const lectureServices = {
  createLecture,
  getLectureById,
  getAllLecture,
  getLectureByModule,
  updateLecture,
  deleteLecture,
};

