import { getContactData } from "@/functions/contact";

import { ContactUsClient } from "./contact-client";

export default async function ContactUsRedesign() {
  const contactData = await getContactData();

  return <ContactUsClient phoneNumber={contactData.phoneNumber} />;
}
