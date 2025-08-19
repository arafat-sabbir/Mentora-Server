import { z } from "zod";

// Validation Schema For createCourse
const createCourseSchema = z.object({
  body:z.object({

  })
})

export const courseValidation = {
  createCourseSchema
}