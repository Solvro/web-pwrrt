"use client";

/// <reference types="grecaptcha" />
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import type { z } from "zod";

// import { sendContactReportForm } from "@/actions/bug-report-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { ReportFormSchema } from "../../../../schemas/index";

// async function getCaptchaToken() {
//   return new Promise<string | null>((resolve) => {
//     grecaptcha.ready(async () => {
//       const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
//       if (!siteKey) {
//         resolve(null);
//         return;
//       }
//       const token = await grecaptcha.execute(siteKey, {
//         action: "sendForm",
//       });
//       resolve(token);
//     });
//   });
// }

export function PartnersForm() {
  const form = useForm<z.infer<typeof ReportFormSchema>>({
    resolver: zodResolver(ReportFormSchema),
    defaultValues: {
      email: "",
      content: "",
    },
  });

  const t = useTranslations("contactUs");
  const [message, setMessage] = useState("");
  // async function onSubmit(values: z.infer<typeof ReportFormSchema>) {
  //   try {
  //     const token = await getCaptchaToken();
  //     const response = await sendContactReportForm(values, token);
  //     if (!response.success) {
  //       toast.error(
  //         `Failed to send message. Please try again. ${response.reason}`,
  //       );
  //       return;
  //     }
  //     toast.success("Thank you for sending a message!");
  //   } catch (error) {
  //     console.error("Message failed:", error);
  //     toast.error("Failed to send the message. Please try again.");
  //   }
  // }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form
          //onSubmit={form.handleSubmit(onSubmit)}
          className="w-[85vw] space-y-10 shadow md:w-[55vw] xl:w-[35vw]"
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
                      placeholder={t("formContactDescription")}
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
  );
}
