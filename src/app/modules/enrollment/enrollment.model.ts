import mongoose, { Schema } from 'mongoose';
import { TEnrollment } from './enrollment.interface';

// Define an interface representing a Enrollment document

// Define the Enrollment schema
const EnrollmentSchema: Schema<TEnrollment> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Enrollment model
const EnrollmentModel = mongoose.model<TEnrollment>('Enrollment', EnrollmentSchema);

// Export the Enrollment model
export default EnrollmentModel;