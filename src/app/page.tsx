"use client";

import { useState } from "react";
import "./homePage.scss";

import Search from "@/features/search/ui/searchBar";
import Terms from "@/features/terms/ui/terms";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="HomePage">
      <Search value={searchInput} onChange={setSearchInput} />
      <Terms searchInput={searchInput} />
    </div>
  );
};

export default HomePage;
