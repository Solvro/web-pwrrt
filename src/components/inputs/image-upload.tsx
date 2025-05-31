/* eslint-disable @typescript-eslint/no-explicit-any */
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  const cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="hounovf4"
      options={{ maxFiles: 1 }}
      onSuccess={(result) => {
        if (result.info) {
          if (typeof result.info === "string") {
            onChange(result.info);
          } else if (result.info.secure_url) {
            onChange(result.info.secure_url);
          }
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            onClick={() => {
              open();
            }}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to upload</div>
            {value ? (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  alt="Upload"
                  fill
                  sizes="100%"
                  src={value}
                  style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            ) : null}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
