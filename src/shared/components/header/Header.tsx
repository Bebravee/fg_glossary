"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ButtonIcon from "./Icons/Button.svg";
import styles from "./Header.module.scss";

interface LinkType {
  href: string;
  label: string;
}

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathName = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const links: LinkType[] = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/credits", label: "Credits" },
    { href: "/donate", label: "Donate" },
  ];

  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

  const renderLink = (link: LinkType) => (
    <Link
      key={link.href}
      href={link.href}
      className={`${pathName === link.href && styles.Active}`}
      onClick={() => setMobileMenu(false)}
    >
      {link.label}
    </Link>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenu(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    };

    if (mobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenu]);

  return (
    <div className={`${styles.Header} container`}>
      <div className={styles.HeaderLogo}>
        <p>FG Glossary RU</p>
      </div>

      <div className={styles.HeaderLinks}>{links.map(renderLink)}</div>

      <div className={styles.HeaderLinksButton} onClick={toggleMobileMenu}>
        <ButtonIcon />
      </div>

      {mobileMenu && (
        <div ref={menuRef} className={styles.MobileMenu}>
          {links.map(renderLink)}
        </div>
      )}
    </div>
  );
};

export default Header;
