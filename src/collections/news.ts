import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

import { slugField } from "@/components/payload/fields/slug";

export const News: CollectionConfig = {
  slug: "news",
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    livePreview: {
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL}/pl/news/${data.slug}`;
      },
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  fields: [
    {
      type: "upload",
      name: "heroImage",
      label: "Główne zdjęcie",
      required: true,
      relationTo: "media",
    },
    {
      type: "text",
      name: "title",
      label: "Tytuł",
      required: true,
      localized: true,
    },
    {
      type: "textarea",
      name: "shortDescription",
      label: "Krótki opis",
      required: true,
      localized: true,
    },
    {
      type: "text",
      name: "tags",
      label: "Tagi",
      required: true,
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "number",
      name: "howLong",
      label: "Czas czytania (minuty)",
      required: true,
      admin: {
        position: "sidebar",
        placeholder: "10",
      },
    },
    {
      type: "relationship",
      relationTo: "users",
      name: "authors",
      label: "Autorzy",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "richText",
      name: "content",
      label: "Treść waszego suuuper pościka :)",
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // BlocksFeature({
          //   blocks: [
          //     {
          //       slug: 'tweet',
          //       fields: [
          //         {
          //           name: 'tweetId',
          //           type: 'text',
          //           required: true,
          //         },
          //       ],
          //     },
          //   ],
          // }),
        ],
      }),
      required: true,
    },
    {
      type: "upload",
      name: "images",
      relationTo: "media",
      hasMany: true,
    },
    slugField(),
  ],
};
