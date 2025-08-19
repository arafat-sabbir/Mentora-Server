import mongoose, { Schema } from 'mongoose';
import { TCourse } from './course.interface';

// Define an interface representing a Course document

// Define the Course schema
const CourseSchema: Schema<TCourse> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Course model
const CourseModel = mongoose.model<TCourse>('Course', CourseSchema);

// Export the Course model
export default CourseModel;