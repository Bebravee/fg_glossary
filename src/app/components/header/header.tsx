"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import NavMenuIcon from "@/assets/icons/nav_menu_icon.svg";

import "./header.scss";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const width = useWindowWidth();

  useEffect(() => {
    if (width > 850 && isMenuVisible) {
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuVisible(false), 150);
    }
  }, [width, isMenuVisible]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/donate", label: "Donate" },
    { href: "/credits", label: "Credits" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    if (isMenuVisible) {
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuVisible(false), 150);
    } else {
      setIsMenuVisible(true);
      setIsMenuOpen(true);
    }
  };

  return (
    <div>
      <nav className="Header">
        <div className="Header-content container">
          <Link href="/" className="Header-logo">
            FG Glossary RU
          </Link>

          <div className="Header-content-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "active" : "non-active"}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button className="Header-content-menu-btn" onClick={toggleMenu}>
            <NavMenuIcon className="Header-content-menu-btn-icon" />
          </button>
        </div>
      </nav>

      {isMenuVisible && (
        <div
          className={`Header-content-menu-mobile ${
            isMenuOpen ? "open" : "close"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={
                pathname === link.href
                  ? "menu-mobile-active"
                  : "menu-mobile-non-active"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
