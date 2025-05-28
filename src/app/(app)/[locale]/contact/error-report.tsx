"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import { sendErrorReportForm } from "@/actions/bug-report-form";
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

import { ErrorReportFormSchema } from "./form-schemas";

export function ErrorReportForm() {
  const form = useForm<z.infer<typeof ErrorReportFormSchema>>({
    resolver: zodResolver(ErrorReportFormSchema),
    defaultValues: {
      email: "",
      content: "",
    },
  });

  const t = useTranslations("contactUs");

  async function onSubmit(values: z.infer<typeof ErrorReportFormSchema>) {
    try {
      await sendErrorReportForm(values);
      toast.success("Thank you for submitting a bug!");
    } catch (error) {
      console.error("Bug report failed:", error);
      toast.error("Failed to submit the bug report. Please try again.");
    }
  }

  return (
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
                  className="peer w-full rounded-md border-2 bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
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
                <Text small>{t("formDescription")}</Text>
              </FormLabel>
              <FormControl>
                <textarea
                  placeholder="..."
                  {...field}
                  className="peer w-full rounded-md border-2 bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
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
          label="Submit Bug Report"
        />
      </form>
    </Form>
  );
}
