// Import the model
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

export const pdfnoteServices = {
  createPdfnote,
  getPdfnoteById,
  getAllPdfnote,
};