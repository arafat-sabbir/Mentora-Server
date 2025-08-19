import { Request, Response } from 'express';
import { moduleServices } from './module.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Module.
const createModule = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new module and get the result
  const result = await moduleServices.createModule(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Module created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single module by ID.
 const getSingleModule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the module by ID and get the result
  const result = await moduleServices.getModuleById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Module Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple module.
 const getAllModule = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple module based on query parameters and get the result
  const result = await moduleServices.getAllModule(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Modules Retrieved Successfully',
    data: result,
  });
});


export const moduleControllers = {
  createModule,
  getSingleModule,
  getAllModule,
}