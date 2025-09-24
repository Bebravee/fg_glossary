"use client";

import { useState } from "react";

import Search from "./components/search/Search";
import Terms from "./components/terms/Terms";
import Pagination from "./components/pagination/pagination";

import style from "./HomeContent.module.scss";

const HomeContent = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<string[]>([]);

  return (
    <div className={style.HomeContent}>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        filteredGames={filteredGames}
        setFilteredGames={setFilteredGames}
      />
      <Terms searchInput={searchInput} filteredGames={filteredGames} />
    </div>
  );
};

export default HomeContent;
