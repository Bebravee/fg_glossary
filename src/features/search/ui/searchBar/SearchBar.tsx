import { useState, useRef } from "react";
import Tekken8Logo from "@/shared/icons/gamesLogos/Tekken8Logo.png";
import SF6Logo from "@/shared/icons/gamesLogos/SF6Logo.png";

import Image from "next/image";
import { CSSTransition } from "react-transition-group";

import Filter from "@/features/filter/Filter";
import styles from "./SearchBar.module.scss";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filteredGames: string[];
  handlerFilteredGames: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
  filteredGames,
  handlerFilteredGames,
}: SearchProps) => {
  const filterWindowRef = useRef<HTMLDivElement>(null);

  const handlerOpen = () => {
    setIsOpen(!isOpen);
  };

  const Tekken8 = "T8";
  const StreetFighter6 = "SF6";

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchBarWithFilterWindow}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Поиск..."
          className={`${isOpen ? styles.InputIsOpen : styles.InputIsClose}`}
        />

        <CSSTransition
          in={isOpen}
          timeout={100}
          nodeRef={filterWindowRef}
          classNames={{
            enter: styles.IsOpen,
            enterActive: styles.IsOpen,
            exit: styles.IsClose,
            exitActive: styles.IsClose,
          }}
          unmountOnExit
        >
          <div ref={filterWindowRef} className={styles.FilterWindow}>
            <div
              className={`${styles.IconContainer} ${
                filteredGames.find((game) => game === Tekken8) && styles.Active
              }`}
              onClick={() => handlerFilteredGames(Tekken8)}
            >
              <Image src={Tekken8Logo} alt={Tekken8} width={50} />
            </div>

            <div
              className={`${styles.IconContainer} ${
                filteredGames.find((game) => game === StreetFighter6) &&
                styles.Active
              }`}
              onClick={() => handlerFilteredGames(StreetFighter6)}
            >
              <Image src={SF6Logo} alt={StreetFighter6} width={50} />
            </div>
          </div>
        </CSSTransition>
      </div>

      <Filter handlerOpen={handlerOpen} isOpen={isOpen} />
    </div>
  );
};

export default SearchBar;
