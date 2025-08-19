// Import the model
import LectureModel from './lecture.model'; 

// Service function to create a new lecture.
const createLecture = async (data: object) => {
  const newLecture = await LectureModel.create(data);
  return newLecture;
};


// Service function to retrieve a single lecture by ID.
const getLectureById = async (id: string) => {
  return await LectureModel.findById(id);
};

// Service function to retrieve multiple lecture based on query parameters.
const getAllLecture = async (query: object) => {
  return await LectureModel.find(query);
};

export const lectureServices = {
  createLecture,
  getLectureById,
  getAllLecture,
};