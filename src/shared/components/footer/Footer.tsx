"use client";

import styles from "./Footer.module.scss";
import RenderLinks from "@/shared/components/links/RenderLinks";
import RenderContacts from "../contacts/RenderContacts";
import RenderLogo from "../logo/RenderLogo";

const Footer = () => {
  return (
    <div className={`${styles.Footer} container`}>
      <div className={styles.FooterLogo}>
        <RenderLogo />
      </div>
      <div className={styles.FooterLinks}>
        <RenderLinks />
      </div>

      <div className={styles.FooterContacts}>
        <RenderContacts />
      </div>
    </div>
  );
};

export default Footer;
