import mongoose, { Schema } from 'mongoose';
import { TPdfnote } from './pdfnote.interface';

// Define an interface representing a Pdfnote document

// Define the Pdfnote schema
const PdfnoteSchema: Schema<TPdfnote> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Pdfnote model
const PdfnoteModel = mongoose.model<TPdfnote>('Pdfnote', PdfnoteSchema);

// Export the Pdfnote model
export default PdfnoteModel;