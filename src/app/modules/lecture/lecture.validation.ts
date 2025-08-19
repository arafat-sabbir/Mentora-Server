import { z } from "zod";

// Validation Schema For createLecture
const createLectureSchema = z.object({
  body:z.object({

  })
})

export const lectureValidation = {
  createLectureSchema
}