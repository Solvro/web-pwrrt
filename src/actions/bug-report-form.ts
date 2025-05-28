"use server";

import type { z } from "zod";

import { ErrorReportFormSchema } from "@/app/(app)/[locale]/contact/form-schemas";

export const sendErrorReportForm = async (
  values: z.infer<typeof ErrorReportFormSchema>,
) => {
  try {
    ErrorReportFormSchema.parse(values);

    // Jakaś funkcja do sprawdzania rate-limitów, czy użytkownik nie spamuje
    // const isSpam = await checkSpam(values);
    // if (isSpam) { return false } czy coś

    const googleFormUrl = process.env.FORMS_LINK;

    const formData = new URLSearchParams();

    if (
      !googleFormUrl ||
      !process.env.FORMS_email ||
      !process.env.FORMS_content
    ) {
      throw new Error("Missing required environment variables");
    }

    formData.append(process.env.FORMS_email, values.email);
    formData.append(process.env.FORMS_content, values.content);

    const response = await fetch(googleFormUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Obsługa odpowiedzi
    if (response.ok) {
      return true;
    } else {
      console.error("Error while sending feedback form", response);
    }
  } catch (error) {
    console.error("Error while sending feedback form", error);
  }
};
