import { Request, Response } from 'express';
import { enrollmentServices } from './enrollment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Enrollment.
const createEnrollment = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new enrollment and get the result
  const result = await enrollmentServices.createEnrollment(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Enrollment created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single enrollment by ID.
 const getSingleEnrollment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the enrollment by ID and get the result
  const result = await enrollmentServices.getEnrollmentById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Enrollment Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple enrollment.
 const getAllEnrollment = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple enrollment based on query parameters and get the result
  const result = await enrollmentServices.getAllEnrollment(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Enrollments Retrieved Successfully',
    data: result,
  });
});


export const enrollmentControllers = {
  createEnrollment,
  getSingleEnrollment,
  getAllEnrollment,
}