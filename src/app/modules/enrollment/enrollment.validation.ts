import { z } from "zod";

// Validation Schema For createEnrollment
const createEnrollmentSchema = z.object({
  body:z.object({

  })
})

export const enrollmentValidation = {
  createEnrollmentSchema
}