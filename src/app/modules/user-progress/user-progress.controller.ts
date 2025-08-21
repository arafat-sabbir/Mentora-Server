import { Request, Response } from 'express';
import { userProgressServices } from './user-progress.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single UserProgress.
const createUserProgress = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new userProgress and get the result
  const result = await userProgressServices.createUserProgress(req.body);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'New UserProgress created Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of a single userProgress by ID.
const getSingleUserProgress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the userProgress by ID and get the result
  const result = await userProgressServices.getUserProgressById(id);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'UserProgress Retrieved Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of multiple userProgress.
const getAllUserProgress = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple userProgress based on query parameters and get the result
  const result = await userProgressServices.getAllUserProgress(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'UserProgresss Retrieved Successfully',
    data: result,
  });
});

export const userProgressControllers = {
  createUserProgress,
  getSingleUserProgress,
  getAllUserProgress,
};
