import styles from "./Search.module.scss";
import FilterIcon from "./icons/filter_icon.svg";

import SF6Logo from "@/shared/img/games/SF6Logo.png";
import Tekken8Logo from "@/shared/img/games/Tekken8Logo.png";

import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  filteredGames: string[];
  setFilteredGames: (value: string[]) => void;
}

const Games = [
  {
    name: "Tekken 8",
    img: Tekken8Logo,
  },

  {
    name: "Street Fighter 6",
    img: SF6Logo,
  },
];

const Search = ({
  searchInput,
  setSearchInput,
  filteredGames,
  setFilteredGames,
}: SearchProps) => {
  const [filteredGamesWindowIsOpen, setFilteredGamesWindowIsOpen] =
    useState(false);

  useEffect(() => {
    console.log(filteredGames);
  }, [filteredGames]);

  const handlerfilteredGamesWindowIsOpen = () => {
    setFilteredGamesWindowIsOpen(!filteredGamesWindowIsOpen);
  };
  return (
    <div className={styles.Search}>
      <div className={styles.SearchBarAndFilterWindow}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Поиск..."
          className={`${filteredGamesWindowIsOpen && styles.IsOpen}`}
        />

        {filteredGamesWindowIsOpen && (
          <div className={styles.Filter}>
            {Games.map((game) => {
              return (
                <div key={game.name}>
                  <Image src={game.img} alt={game.name} width={50}></Image>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={`${styles.FilterIconContainer} ${
          filteredGamesWindowIsOpen && styles.FilterIconContainerIsOpen
        }`}
        onClick={handlerfilteredGamesWindowIsOpen}
      >
        <FilterIcon />
      </div>
    </div>
  );
};

export default Search;
