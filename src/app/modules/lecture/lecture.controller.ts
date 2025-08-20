import { Request, Response } from 'express';
import { lectureServices } from './lecture.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Lecture.
const createLecture = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new lecture and get the result
  const result = await lectureServices.createLecture(req.body);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'New Lecture created Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of a single lecture by ID.
const getSingleLecture = catchAsync(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  // Call the service method to get the lecture by ID and get the result
  const result = await lectureServices.getLectureById(lectureId);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Lecture Retrieved Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of multiple lecture.
const getAllLecture = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple lecture based on query parameters and get the result
  const result = await lectureServices.getAllLecture(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Lectures Retrieved Successfully',
    data: result,
  });
});

const getLectureByModule = catchAsync(async (req: Request, res: Response) => {
  const { moduleId } = req.params;
  // Call the service method to get the lecture by moduleId and get the result
  const result = await lectureServices.getLectureByModule(moduleId);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Lecture For Specific Module Retrieved Successfully',
    data: result,
  });
});

const updateLecture = catchAsync(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  // Call the service method to get the lecture by ID and get the result
  const result = await lectureServices.updateLecture(lectureId, req.body);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Lecture Updated Successfully',
    data: result,
  });
});

const deleteLecture = catchAsync(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  // Call the service method to get the lecture by ID and get the result
  const result = await lectureServices.deleteLecture(lectureId);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Lecture Deleted Successfully',
    data: result,
  });
});

export const lectureControllers = {
  createLecture,
  getSingleLecture,
  getAllLecture,
  getLectureByModule,
  updateLecture,
  deleteLecture,
};

