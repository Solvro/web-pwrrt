import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { en } from "@payloadcms/translations/languages/en";
import { pl } from "@payloadcms/translations/languages/pl";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Achievements } from "./collections/achievements";
import { Bolids } from "./collections/bolids";
import { Media } from "./collections/media";
import { News } from "./collections/news";
import Partners from "./collections/partners";
import { TeamMembers } from "./collections/team-members";
import { Users } from "./collections/users";
import Banner from "./globals/banner";
import Contact from "./globals/contact";
import Departments from "./globals/departments";
import FooterSection from "./globals/footer-section";
import JoinUs from "./globals/join-us";
import MainPage from "./globals/main-page";
import TeamStats from "./globals/team-stats";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Bolids,
    Partners,
    TeamMembers,
    News,
    Achievements,
  ],
  globals: [
    MainPage,
    Departments,
    FooterSection,
    JoinUs,
    Contact,
    TeamStats,
    Banner,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? "",
  }),
  i18n: {
    supportedLanguages: { en, pl },
    fallbackLanguage: "pl",
  },
  localization: {
    locales: ["en", "pl"],
    defaultLocale: "pl",
  },
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? "",
      config: {
        endpoint: process.env.S3_ENDPOINT ?? "",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.S3_REGION ?? "",
        tls: process.env.NODE_ENV === "production",
        forcePathStyle: true,
        // ... Other S3 configuration
      },
    }),
  ],
});
