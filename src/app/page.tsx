"use client";

import { useState } from "react";

import Search from "@/features/search/ui/searchBar/SearchBar";
import Terms from "@/features/terms/ui/Terms";

import styles from "./page.module.scss";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.HomePage}>
      <Search
        value={searchInput}
        onChange={setSearchInput}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Terms searchInput={searchInput} isOpen={isOpen}/>
    </div>
  );
};

export default HomePage;
