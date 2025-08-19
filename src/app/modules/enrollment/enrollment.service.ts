// Import the model
import EnrollmentModel from './enrollment.model'; 

// Service function to create a new enrollment.
const createEnrollment = async (data: object) => {
  const newEnrollment = await EnrollmentModel.create(data);
  return newEnrollment;
};


// Service function to retrieve a single enrollment by ID.
const getEnrollmentById = async (id: string) => {
  return await EnrollmentModel.findById(id);
};

// Service function to retrieve multiple enrollment based on query parameters.
const getAllEnrollment = async (query: object) => {
  return await EnrollmentModel.find(query);
};

export const enrollmentServices = {
  createEnrollment,
  getEnrollmentById,
  getAllEnrollment,
};