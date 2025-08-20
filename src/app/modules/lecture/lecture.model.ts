import mongoose, { Schema } from 'mongoose';
import { TLecture } from './lecture.interface';

// Define an interface representing a Lecture document

// Define the Lecture schema
const LectureSchema: Schema<TLecture> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    lectureNumber: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

// Create the Lecture model
const LectureModel = mongoose.model<TLecture>('Lecture', LectureSchema);

// Export the Lecture model
export default LectureModel;
