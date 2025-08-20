// Import the model
import AppError from '../../errors/AppError';
import deleteFileIfExists from '../../utils/deleteFileIsExist';
import LectureModel from '../lecture/lecture.model';
import PdfnoteModel from './pdfnote.model';

// Service function to create a new pdfnote.
const createPdfnote = async (data: object) => {
  const newPdfnote = await PdfnoteModel.create(data);
  return newPdfnote;
};

// Service function to retrieve a single pdfnote by ID.
const getPdfnoteById = async (id: string) => {
  return await PdfnoteModel.findById(id);
};

// Service function to retrieve multiple pdfnote based on query parameters.
const getAllPdfnote = async (query: object) => {
  return await PdfnoteModel.find(query);
};

const getPdfNotesByLecture = async (lectureId: string) => {
  const lecture = await LectureModel.findById(lectureId);
  if (!lecture) {
    throw new AppError(404, 'Lecture not found');
  }
  return await PdfnoteModel.find({ lectureId });
};

const deletePdfNotes = async (id: string) => {
  const pdfNote = await PdfnoteModel.findById(id);
  if (!pdfNote) {
    throw new AppError(404, 'Pdf Notes Not Found');
  }
  if (pdfNote.pdfUrl) {
    deleteFileIfExists(pdfNote.pdfUrl);
  }
  return await PdfnoteModel.deleteOne({ _id: id });
};

export const pdfnoteServices = {
  createPdfnote,
  getPdfnoteById,
  getAllPdfnote,
  getPdfNotesByLecture,
  deletePdfNotes,
};

