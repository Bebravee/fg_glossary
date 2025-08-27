"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./header.scss";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/donate", label: "Donate" },
    { href: "/credits", label: "Credits" },
    { href: "/contact", label: "Contact" },
  ];

  return (
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
      </div>
    </nav>
  );
};

export default Header;
