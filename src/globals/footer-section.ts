import type { GlobalConfig } from "payload";

const FooterSection: GlobalConfig = {
  slug: "footer-section",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "address",
      type: "text",
      label: "Adres",
      defaultValue: "Sopocka 16, Wrocław",
      required: true,
    },
    {
      name: "mapLink",
      type: "text",
      label: "Link do mapy",
      defaultValue: "https://maps.app.goo.gl/A3E2pEjZndstzrDT8",
      required: true,
    },
    {
      name: "zipCode",
      type: "text",
      label: "Kod pocztowy i miasto",
      defaultValue: "50-344 Wrocław",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Numer telefonu",
      defaultValue: "+48 882 454 945",
      required: true,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      defaultValue: "racing.pwr@gmail.com",
      required: true,
    },
  ],
};

export default FooterSection;
