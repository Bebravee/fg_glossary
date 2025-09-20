"use client";

import styles from "./Footer.module.scss";
import RenderLink from "@/shared/components/links/Links";

const Footer = () => {
  return (
    <div className={`${styles.Footer} container`}>
      <div className={styles.FooterContent}>
        <div className={styles.FooterContentLinks}>
          <RenderLink />
        </div>

        <div className={styles.FooterContentContacts}>
          <RenderLink />
        </div>
      </div>
    </div>
  );
};

export default Footer;
