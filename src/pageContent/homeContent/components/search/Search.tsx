import styles from "./Search.module.scss";
import FilterIcon from "./icons/filter_icon.svg";

import Games from "@/shared/date/games.json";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  filteredGames: string[];
  setFilteredGames: (value: string[]) => void;
}

const Search = ({
  searchInput,
  setSearchInput,
  filteredGames,
  setFilteredGames,
}: SearchProps) => {
  const [filteredGamesWindowIsOpen, setFilteredGamesWindowIsOpen] =
    useState(false);

  const handlerfilteredGamesWindowIsOpen = () => {
    setFilteredGamesWindowIsOpen(!filteredGamesWindowIsOpen);
  };

  const handlerFilteredGames = (game: string) => {
    if (filteredGames.includes(game)) {
      setFilteredGames(filteredGames.filter((g) => g !== game));
    } else {
      setFilteredGames([...filteredGames, game]);
    }
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
              const imageSrc =
                require(`@/shared/img/games/${game.img}`).default;

              return (
                <div
                  key={game.name}
                  className={`${styles.FilterGameContainer} ${
                    filteredGames.includes(game.name) && styles.Active
                  }`}
                  onClick={() => {
                    handlerFilteredGames(game.name);
                  }}
                >
                  <Image src={imageSrc} alt={game.name} width={50}></Image>
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
