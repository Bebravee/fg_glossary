"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ButtonIcon from "./icons/Button.svg";
import styles from "./Header.module.scss";

interface LinkType {
  href: string;
  label: string;
}

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathName = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const links: LinkType[] = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/credits", label: "Credits" },
    { href: "/donate", label: "Donate" },
  ];

  const toggleMobileMenu = () => {
    if (mobileMenu) {
      // Запускаем анимацию закрытия
      setIsClosing(true);
      setTimeout(() => {
        setMobileMenu(false);
        setIsClosing(false);
      }, 150); // Длительность анимации
    } else {
      setMobileMenu(true);
    }
  };

  const renderLink = (link: LinkType) => (
    <Link
      key={link.href}
      href={link.href}
      className={`${pathName === link.href && styles.Active}`}
      onClick={() => {
        setIsClosing(true);
        setTimeout(() => {
          setMobileMenu(false);
          setIsClosing(false);
        }, 150);
      }}
    >
      {link.label}
    </Link>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMobileMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 850 && mobileMenu) {
        toggleMobileMenu();
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
        <div
          ref={menuRef}
          className={`${styles.MobileMenu} ${
            isClosing ? styles.Close : styles.Open
          }`}
        >
          {links.map(renderLink)}
        </div>
      )}
    </div>
  );
};

export default Header;
