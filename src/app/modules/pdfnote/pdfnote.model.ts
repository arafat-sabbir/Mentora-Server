import mongoose, { Schema } from 'mongoose';
import { TPdfnote } from './pdfnote.interface';

// Define an interface representing a Pdfnote document

// Define the Pdfnote schema
const PdfnoteSchema: Schema<TPdfnote> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    pdfUrl: { type: String, required: true, trim: true },
    lectureId: { type: Schema.Types.ObjectId, ref: 'Lecture', required: true },
  },
  { timestamps: true, versionKey: false }
);

// Create the Pdfnote model
const PdfnoteModel = mongoose.model<TPdfnote>('Pdfnote', PdfnoteSchema);

// Export the Pdfnote model
export default PdfnoteModel;

