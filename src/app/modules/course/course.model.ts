import mongoose, { Schema } from 'mongoose';
import { TCourse } from './course.interface';

// Define an interface representing a Course document

// Define the Course schema
const CourseSchema: Schema<TCourse> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, trim: true }, // image URL or file path
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

// Create the Course model
const CourseModel = mongoose.model<TCourse>('Course', CourseSchema);

// Export the Course model
export default CourseModel;

