"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import NavMenuIcon from "@/assets/icons/nav_menu_icon.svg";

import "./header.scss";

const Header = () => {
  const pathname = usePathname();
  const width = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/donate", label: "Donate" },
    { href: "/credits", label: "Credits" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    <nav className="Header">
      <div className="Header-content container">
        <Link href="/" className="Header-logo">
          FG Glossary RU
        </Link>

        {width > 850 ? (
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
        ) : (
          <button className="Header-content-menu-btn" onClick={toggleMenu}>
            <NavMenuIcon className="Header-content-menu-btn-icon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
