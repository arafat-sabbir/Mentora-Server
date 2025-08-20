import { Request, Response } from 'express';
import { courseServices } from './course.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Course.
const createCourse = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new course and get the result
  const result = await courseServices.createCourse(req.body);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'New Course created Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of a single course by ID.
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the course by ID and get the result
  const result = await courseServices.getCourseById(id);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Course Retrieved Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of multiple course.
const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple course based on query parameters and get the result
  const result = await courseServices.getAllCourse(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Courses Retrieved Successfully',
    data: result,
  });
});

// Controller function to handle the update course.
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple course based on query parameters and get the result
  const result = await courseServices.updateCourse(req.params.id, req.body);
  // Send a success response with the retrieved updated data
  sendResponse(res, {
    message: 'Courses Retrieved Successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourse,
  updateCourse,
};

