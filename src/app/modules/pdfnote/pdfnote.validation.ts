import { z } from "zod";

// Validation Schema For createPdfnote
const createPdfnoteSchema = z.object({
  body:z.object({

  })
})

export const pdfnoteValidation = {
  createPdfnoteSchema
}