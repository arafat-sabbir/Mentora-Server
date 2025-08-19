import mongoose, { Schema } from 'mongoose';
import { TLecture } from './lecture.interface';

// Define an interface representing a Lecture document

// Define the Lecture schema
const LectureSchema: Schema<TLecture> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Lecture model
const LectureModel = mongoose.model<TLecture>('Lecture', LectureSchema);

// Export the Lecture model
export default LectureModel;