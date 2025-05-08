"use client";

import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/Button";
import Title from "@/components/title";

interface NewsControlsProps {
  dict: {
    title: string;
    becomePartner: string;
    contact: string;
  };
}

const NewsControls: React.FC<NewsControlsProps> = ({ dict }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Title color="black">{dict.title}</Title>
      <div className="flex w-full gap-4 md:w-2/5">
        <Button
          label={dict.becomePartner}
          onClick={() => {
            router.push(`/partners/joinus`);
          }}
        />
        <Button
          outline
          label={dict.contact}
          onClick={() => {
            router.push(`/contact`);
          }}
        />
      </div>
    </div>
  );
};

export default NewsControls;
