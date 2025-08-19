import { Request, Response } from 'express';
import { userprogressServices } from './userprogress.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Userprogress.
const createUserprogress = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new userprogress and get the result
  const result = await userprogressServices.createUserprogress(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Userprogress created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single userprogress by ID.
 const getSingleUserprogress = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the userprogress by ID and get the result
  const result = await userprogressServices.getUserprogressById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Userprogress Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple userprogress.
 const getAllUserprogress = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple userprogress based on query parameters and get the result
  const result = await userprogressServices.getAllUserprogress(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Userprogresss Retrieved Successfully',
    data: result,
  });
});


export const userprogressControllers = {
  createUserprogress,
  getSingleUserprogress,
  getAllUserprogress,
}