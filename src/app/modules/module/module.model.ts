import mongoose, { Schema } from 'mongoose';
import { TModule } from './module.interface';

// Define an interface representing a Module document

// Define the Module schema
const ModuleSchema: Schema<TModule> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Module model
const ModuleModel = mongoose.model<TModule>('Module', ModuleSchema);

// Export the Module model
export default ModuleModel;