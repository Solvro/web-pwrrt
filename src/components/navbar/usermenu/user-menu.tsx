"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import Avatar from "../../Avatar";
import MenuItem from "./MenuItem";
import SocialIcons from "./SocialIcons";

export function UserMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("navigation");

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current != null &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemClick = useCallback(
    (path: string) => {
      const currentLocale = pathname.split("/")[1];
      const newPath = `/${currentLocale}${path}`;
      router.push(newPath);
      setIsOpen(false);
    },
    [router, pathname],
  );

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
            {/* <LangButton lang={lang} /> */}
            langBtnToDo
          </div>
        </div>
        <button
          onClick={toggleOpen}
          className="userMenu-responsive ml-8 hidden cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-white p-2 text-white transition duration-300 hover:border-customRed hover:bg-customRed hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden">
            <Avatar></Avatar>
          </div>
        </button>
      </div>
      {isOpen ? (
        <div className="absolute right-0 top-12 overflow-hidden rounded-xl bg-white text-sm shadow-md">
          <div className="flex cursor-pointer flex-col">
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/`);
              }}
              label="Home"
            />
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/bolid/RT14e`);
              }}
              label={t("bolid")}
            />
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/team/RT14e`);
              }}
              label={t("team")}
            />
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/about`);
              }}
              label={t("about")}
            />
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/partners`);
              }}
              label={t("partners")}
            />
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/news`);
              }}
              label={t("news")}
            />
            <MenuItem
              onClick={() => {
                handleMenuItemClick(`/contact`);
              }}
              label={t("contact")}
            />
            <div className="h-[1px] w-full bg-black"></div>
            <div className="social-responsive mx-3 my-2 flex items-center gap-4">
              <SocialIcons
                black
                href="https://www.facebook.com/PWRRacingTeam"
                icon={FaFacebookF}
                ariaLabel="Facebook"
              />
              <SocialIcons
                black
                href="https://www.instagram.com/pwrracingteam/"
                icon={FaInstagram}
                ariaLabel="Instagram"
              />
              <SocialIcons
                black
                href="https://www.linkedin.com/company/pwr-racing-team/posts/?feedView=all"
                icon={FaLinkedinIn}
                ariaLabel="LinkedIn"
              />
              <SocialIcons
                black
                href="https://www.youtube.com/@PWRRacingTeam"
                icon={FaYoutube}
                ariaLabel="YouTube"
              />
              {/* <LangButton lang={lang} /> */}
              langBtnToDo
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
