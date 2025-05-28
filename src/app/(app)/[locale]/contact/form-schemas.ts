import { z } from "zod";

// form schema to make sure the user sends only required data
export const ErrorReportFormSchema = z.object({
  email: z.string(),
  content: z.string(),
});
