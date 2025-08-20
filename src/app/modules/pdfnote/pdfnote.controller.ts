import { Request, Response } from 'express';
import { pdfnoteServices } from './pdfnote.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Pdfnote.
const createPdfnote = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new pdfnote and get the result
  const result = await pdfnoteServices.createPdfnote(req.body);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'New Pdfnote created Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of a single pdfnote by ID.
const getSinglePdfnote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the pdfnote by ID and get the result
  const result = await pdfnoteServices.getPdfnoteById(id);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Pdfnote Retrieved Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of multiple pdfnote.
const getAllPdfnote = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple pdfnote based on query parameters and get the result
  const result = await pdfnoteServices.getAllPdfnote(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Pdfnotes Retrieved Successfully',
    data: result,
  });
});

const getPdfNotesByLecture = catchAsync(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  // Call the service method to get the lecture by lectureId and get the result
  const result = await pdfnoteServices.getPdfNotesByLecture(lectureId);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Lecture For Specific Module Retrieved Successfully',
    data: result,
  });
});

const deletePdfNotes = catchAsync(async (req: Request, res: Response) => {
  const { pdfNoteId } = req.params;
  // Call the service method to get the lecture by lectureId and get the result
  const result = await pdfnoteServices.deletePdfNotes(pdfNoteId);
  // Send a success response with the retrieved resource data
  sendResponse(res, {
    message: 'Pdf Notes Delete Successfully',
    data: result,
  });
});

export const pdfnoteControllers = {
  createPdfnote,
  getSinglePdfnote,
  getAllPdfnote,
  getPdfNotesByLecture,
  deletePdfNotes,
};

