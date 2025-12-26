"use client";

/// <reference types="grecaptcha" />
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import { sendErrorReportForm } from "@/actions/bug-report-form";
// import { Button } from "@/components/button";
// import { Text } from "@/components/text";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

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

export function ErrorReportForm() {
  const form = useForm<z.infer<typeof ReportFormSchema>>({
    resolver: zodResolver(ReportFormSchema),
    defaultValues: {
      email: "",
      content: "",
    },
  });

  const t = useTranslations("contactUs");
  const [message, setMessage] = useState("");

  async function onSubmit(values: z.infer<typeof ReportFormSchema>) {
    try {
      const token = await getCaptchaToken();
      const response = await sendErrorReportForm(values, token);
      if (!response.success) {
        toast.error(
          `Failed to submit the bug report. Please try again. ${response.reason}`,
        );
        return;
      }
      toast.success("Thank you for submitting a bug!");
    } catch (error) {
      console.error("Bug report failed:", error);
      toast.error("Failed to submit the bug report. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "text-ring relative inline-flex max-w-max cursor-pointer",
            "after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-full after:-translate-x-1/2",
            "after:bg-ring after:origin-center after:scale-x-0",
            "after:transition-transform after:duration-300 after:ease-out",
            "hover:after:scale-x-100",
          )}
        >
          {t("formSubmitBugReport")}
        </button>
      </DialogTrigger>
      <DialogContent className="text-ring bg-[#0c0c0c] sm:max-w-[425px]">
        <DialogTitle className="flex justify-center">Bug report</DialogTitle>
        <div className="flex w-full flex-col items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 w-[80%] space-y-4 shadow"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder={t("formEmail")}
                        {...field}
                        className="placeholder-ring border-ring border-b bg-transparent px-1 py-3 focus:outline-none"
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
                    <FormControl>
                      <div className="relative">
                        <textarea
                          placeholder={t("formBugDescription")}
                          {...field}
                          maxLength={200}
                          rows={6}
                          value={message}
                          onChange={(event) => {
                            setMessage(event.target.value);
                          }}
                          className="placeholder-ring border-ring w-full resize-none border-b bg-transparent px-1 py-3 focus:outline-none"
                        />
                        <span className="text-ring absolute right-0 bottom-3 text-sm">
                          {message.length}/200
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className={cn(
                  "group border-ring text-ring flex gap-[5px] rounded-full border px-6 py-2 hover:bg-gray-800",
                  "cursor-pointer",
                )}
              >
                {t("formSubmitContactButton")}
                <span
                  className={cn(
                    "inline-block transition-transform duration-300 ease-out",
                    "group-hover:translate-x-1.5",
                  )}
                >
                  →
                </span>
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
