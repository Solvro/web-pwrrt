import { getFooterSectionData } from "@/functions/footer-section";

import { FooterSectionClient } from "./footer-section-client";

export async function FooterSection() {
  const footerSectionData = await getFooterSectionData();

  return (
    <FooterSectionClient
      email={footerSectionData.email}
      phoneNumber={footerSectionData.phone}
      mapLink={footerSectionData.mapLink}
      address={footerSectionData.address}
      zipCode={footerSectionData.zipCode}
    />
  );
}
