"use client";

import { useState } from "react";

import Search from "./components/search/Search";

const HomeContent = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<string[]>([]);

  return (
    <div>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        filteredGames={filteredGames}
        setFilteredGames={setFilteredGames}
      />
    </div>
  );
};

export default HomeContent;
