import mongoose, { Schema } from 'mongoose';
import { TModule } from './module.interface';

// Define an interface representing a Module document

// Define the Module schema
const ModuleSchema: Schema<TModule> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    moduleNumber: {
      type: Number,
      required: true,
      unique: [true, 'Module number must be unique per course'],
    },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, versionKey: false }
);

// Create the Module model
const ModuleModel = mongoose.model<TModule>('Module', ModuleSchema);

// Export the Module model
export default ModuleModel;
