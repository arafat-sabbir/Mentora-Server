import { z } from "zod";

// Validation Schema For createUserprogress
const createUserprogressSchema = z.object({
  body:z.object({

  })
})

export const userprogressValidation = {
  createUserprogressSchema
}