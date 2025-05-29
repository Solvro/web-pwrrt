"use server";

import type { z } from "zod";

import { verifyCaptchaToken } from "@/app/(app)/[locale]/contact/captcha";
import { ErrorReportFormSchema } from "@/app/(app)/[locale]/contact/form-schemas";

type ReportResult = { success: true } | { success: false; reason: string };

export const sendErrorReportForm = async (
  values: z.infer<typeof ErrorReportFormSchema>,
  token: string | null,
): Promise<ReportResult> => {
  try {
    if (!token) {
      return { success: false, reason: "missing_token" };
    }
    const captchaData = await verifyCaptchaToken(token);
    if (!captchaData) {
      return { success: false, reason: "no_captcha_data" };
    }
    if (!captchaData.success || captchaData.score < 0.5) {
      return { success: false, reason: "captcha_failed" };
    }

    ErrorReportFormSchema.parse(values);
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
    if (!response.ok) {
      return { success: false, reason: "form_submit_failed" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error while sending feedback form", error);
    return { success: false, reason: "form_submit_failed" };
  }
};
