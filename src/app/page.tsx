"use client";

import { useState } from "react";
import "./homePage.scss";

import Search from "./components/search/search";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="HomePage">
      <Search value={searchInput} onChange={setSearchInput} />
      {searchInput}
    </div>
  );
};

export default HomePage;
