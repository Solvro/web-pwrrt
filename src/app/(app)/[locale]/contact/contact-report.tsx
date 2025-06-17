"use client";

/// <reference types="grecaptcha" />
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import { sendContactReportForm } from "@/actions/bug-report-form";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ReportFormSchema } from "../../../../schemas/index";

async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
      if (!siteKey) {
        resolve(null);
        return;
      }
      const token = await grecaptcha.execute(siteKey, {
        action: "sendForm",
      });
      resolve(token);
    });
  });
}

export function ContactReportForm() {
  const form = useForm<z.infer<typeof ReportFormSchema>>({
    resolver: zodResolver(ReportFormSchema),
    defaultValues: {
      email: "",
      content: "",
    },
  });

  const t = useTranslations("contactUs");

  async function onSubmit(values: z.infer<typeof ReportFormSchema>) {
    try {
      const token = await getCaptchaToken();
      const response = await sendContactReportForm(values, token);
      if (!response.success) {
        toast.error(
          `Failed to send message. Please try again. ${response.reason}`,
        );
        return;
      }
      toast.success("Thank you for sending a message!");
    } catch (error) {
      console.error("Message failed:", error);
      toast.error("Failed to send the message. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="my-4 mb-2 flex w-3/5 flex-col items-center border-b-2 border-black py-4 text-center">
        <Text bold medium>
          {t("contactUsForm")}
        </Text>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-8 w-[85vw] space-y-4 rounded border p-4 shadow md:w-[55vw] xl:w-[35vw]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text small>{t("formEmail")}</Text>
                </FormLabel>
                <FormControl>
                  <input
                    placeholder="123456@student.pwr.edu.pl"
                    {...field}
                    className="peer w-full rounded-md border-1 border-[#cb1f3a] bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text small>{t("formContactDescription")}</Text>
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder="..."
                    {...field}
                    className="peer w-full rounded-md border-1 border-[#cb1f3a] bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            size="default"
            label={t("formSubmitContactReport")}
          />
        </form>
      </Form>
    </div>
  );
}
