"use client";

import { useState } from "react";

import Search from "@/features/search/ui/searchBar/SearchBar";
import Terms from "@/features/terms/ui/Terms";

import styles from "./page.module.scss";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className={styles.HomePage}>
      <Search value={searchInput} onChange={setSearchInput} />
      <Terms searchInput={searchInput} />
    </div>
  );
};

export default HomePage;
