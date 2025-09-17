import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";

import Header from "@/shared/components/header/Header";
import Footer from "@/shared/components/footer/Footer";

import "@/shared/styles/global.scss";

const exo_2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo-2",
});

export const metadata: Metadata = {
  title: "fg_glossary",
  description: "fighting games glossary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={exo_2.className}>
      <body>
        <Header />
        <div className="container content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
