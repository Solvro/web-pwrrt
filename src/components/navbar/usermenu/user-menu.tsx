"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { LangButton } from "./lang-button";
import { SocialIcons } from "./social-icons";

export function UserMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const lang = useLocale();

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-4">
        <div className="hidden items-center gap-4 md:flex">
          <div className="social-responsive ml-4 flex items-center gap-4">
            <SocialIcons
              href="https://www.facebook.com/PWRRacingTeam"
              icon={FaFacebookF}
              ariaLabel="Facebook"
            />
            <SocialIcons
              href="https://www.instagram.com/pwrracingteam/"
              icon={FaInstagram}
              ariaLabel="Instagram"
            />
            <SocialIcons
              href="https://www.linkedin.com/company/pwr-racing-team/posts/?feedView=all"
              icon={FaLinkedinIn}
              ariaLabel="LinkedIn"
            />
            <SocialIcons
              href="https://www.youtube.com/@PWRRacingTeam"
              icon={FaYoutube}
              ariaLabel="YouTube"
            />
            <LangButton lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
