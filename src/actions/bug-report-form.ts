"use server";

import type * as z from "zod";

import { verifyCaptchaToken } from "@/lib/recaptcha";
import { ReportFormSchema } from "@/schemas/index";

type ReportResult = { success: true } | { success: false; reason: string };

export async function sendErrorReportForm(
  values: z.infer<typeof ReportFormSchema>,
  token: string | null,
): Promise<ReportResult> {
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

    ReportFormSchema.parse(values);
    const googleFormUrl = process.env.FORMS_BUG_LINK;
    console.warn(googleFormUrl);
    console.warn(process.env.FORMS_BUG_email);
    console.warn(process.env.FORMS_BUG_content);
    const formData = new URLSearchParams();
    if (
      !googleFormUrl ||
      !process.env.FORMS_BUG_email ||
      !process.env.FORMS_BUG_content
    ) {
      throw new Error("Missing required environment variables");
    }
    formData.append(process.env.FORMS_BUG_email, values.email);
    formData.append(process.env.FORMS_BUG_content, values.content);
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
}

export async function sendContactReportForm(
  values: z.infer<typeof ReportFormSchema>,
  token: string | null,
): Promise<ReportResult> {
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

    ReportFormSchema.parse(values);
    const googleFormUrl = process.env.FORMS_CONTACT_LINK;
    const formData = new URLSearchParams();
    if (
      !googleFormUrl ||
      !process.env.FORMS_CONTACT_email ||
      !process.env.FORMS_CONTACT_content
    ) {
      throw new Error("Missing required environment variables");
    }
    formData.append(process.env.FORMS_CONTACT_email, values.email);
    formData.append(process.env.FORMS_CONTACT_content, values.content);
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
}
