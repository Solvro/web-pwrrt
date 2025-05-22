"use client";

import toast from "react-hot-toast";

import { Button } from "@/components/button";
import { Text } from "@/components/text";

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // const form = event.target as HTMLFormElement;
  toast.success(`Thank you for submiting a bug!`);

  // form.submit();
};

export function ErrorReportForm() {
  return (
    <form
      action="https://formsubmit.co/YOUR_EMAIL@example.com"
      method="POST"
      onSubmit={handleSubmit}
      className="mx-auto mt-8 space-y-4 rounded border p-4 shadow xl:w-[35vw]"
    >
      <label htmlFor="bugReportFormName">
        <Text small>Name</Text>
      </label>
      <input
        id="bugReportFormName"
        type="text"
        name="name"
        placeholder="Your name"
        required
        className="peer w-full rounded-md border-2 bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
      />

      <label htmlFor="bugReportFormEmail">
        <Text small>Email</Text>
      </label>
      <input
        id="bugReportFormEmail"
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="peer w-full rounded-md border-2 bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
      />

      <label htmlFor="bugReportFormDesc">
        <Text small>Bug descipriton</Text>
      </label>
      <textarea
        id="bugReportFormDesc"
        name="description"
        placeholder="Describe the bug..."
        required
        className="peer w-full rounded-md border-2 bg-white p-4 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70"
        rows={4}
      />

      <input type="hidden" name="_captcha" value="false" />

      <Button
        type="submit"
        variant="default"
        size="default"
        label="Submit Bug Report"
      />
    </form>
  );
}
