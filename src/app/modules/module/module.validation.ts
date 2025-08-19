import { z } from "zod";

// Validation Schema For createModule
const createModuleSchema = z.object({
  body:z.object({

  })
})

export const moduleValidation = {
  createModuleSchema
}