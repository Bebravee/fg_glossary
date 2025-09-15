"use client";

import { use, useState } from "react";

import Search from "@/features/search/ui/searchBar/SearchBar";
import Terms from "@/features/terms/ui/Terms";

import styles from "./page.module.scss";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredGames, setFilteredGames] = useState<string[]>([]);

  const handlerFilteredGames = (value: string) => {
    setFilteredGames((prev) =>
      prev.includes(value)
        ? prev.filter((game) => game !== value)
        : [...prev, value]
    );
  };

  return (
    <div className={styles.HomePage}>
      <Search
        value={searchInput}
        onChange={setSearchInput}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        filteredGames={filteredGames}
        handlerFilteredGames={handlerFilteredGames}
      />
      <Terms
        searchInput={searchInput}
        isOpen={isOpen}
        filteredGames={filteredGames}
      />
    </div>
  );
};

export default HomePage;
