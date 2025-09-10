"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useWindowWidth from "@/shared/hooks/useWindowWidth";
import NavMenuIcon from "@/shared/icons/nav_menu_icon.svg";
import rukia from "./rukia.png";

import styles from "./Header.module.scss";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const width = useWindowWidth();

  useEffect(() => {
    if (width > 850 && isMenuVisible) {
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuVisible(false), 150);
    }
  }, [width, isMenuVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setTimeout(() => setIsMenuVisible(false), 150);
      }
    };

    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

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
      <nav className={styles.Header}>
        <div className={styles.HeaderContent}>
          <Link href="/" className={styles.HeaderLogo}>
            FG Glossary RU
            <Image
              className={styles.HeaderRukia}
              src={rukia}
              alt="rukia"
              width={50}
              height={50}
            />
          </Link>

          <div className={styles.HeaderLinks}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href ? styles.Active : styles.NonActive
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button className={styles.HeaderMenuButton} onClick={toggleMenu}>
            <NavMenuIcon className={styles.HeaderMenuButtonIcon} />
          </button>
        </div>
      </nav>

      {isMenuVisible && (
        <div
          ref={menuRef}
          className={`${styles.HeaderMenuMobile} ${
            isMenuOpen
              ? styles.HeaderMenuMobileOpen
              : styles.HeaderMenuMobileClose
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={
                pathname === link.href
                  ? styles.HeaderMenuMobileActive
                  : styles.HeaderMenuMobileNonActive
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
