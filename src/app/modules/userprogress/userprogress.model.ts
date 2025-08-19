import mongoose, { Schema } from 'mongoose';
import { TUserprogress } from './userprogress.interface';

// Define an interface representing a Userprogress document

// Define the Userprogress schema
const UserprogressSchema: Schema<TUserprogress> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Userprogress model
const UserprogressModel = mongoose.model<TUserprogress>('Userprogress', UserprogressSchema);

// Export the Userprogress model
export default UserprogressModel;