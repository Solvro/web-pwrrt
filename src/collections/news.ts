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
  },
  fields: [
    {
      type: "upload",
      name: "heroImage",
      required: true,
      relationTo: "media",
    },
    {
      type: "text",
      name: "title",
      required: true,
      localized: true,
    },
    {
      type: "textarea",
      name: "shortDescription",
      required: true,
      localized: true,
    },
    {
      type: "text",
      name: "tags",
      required: true,
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "relationship",
      relationTo: "users",
      name: "authors",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "richText",
      name: "content",
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
