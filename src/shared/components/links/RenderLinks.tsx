import Link from "next/link";
import { usePathname } from "next/navigation";

interface RenderLinkProps {
  onClick?: () => void;
  activeLink?: string;
}

interface LinkType {
  href: string;
  label: string;
}

const links: LinkType[] = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/credits", label: "Credits" },
  { href: "/donate", label: "Donate" },
  { href: "/game", label: "Game" },
];

const RenderLinks = ({ onClick, activeLink }: RenderLinkProps) => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={`${activeLink && isActive && activeLink}`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export default RenderLinks;
