"use client";
import { useState, useEffect, useRef } from "react";

import ButtonIcon from "./icons/Button.svg";
import styles from "./Header.module.scss";

import RenderLinks from "../links/RenderLinks";
import RenderLogo from "../logo/RenderLogo";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    if (mobileMenu) {
      setIsClosing(true);
      setTimeout(() => {
        setMobileMenu(false);
        setIsClosing(false);
      }, 150);
    } else {
      setMobileMenu(true);
    }
  };

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
        <RenderLogo />
      </div>

      <div className={styles.HeaderLinks}>
        <RenderLinks activeLink={styles.Active} />
      </div>

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
          <RenderLinks
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                setMobileMenu(false);
                setIsClosing(false);
              }, 150);
            }}
            activeLink={styles.Active}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
