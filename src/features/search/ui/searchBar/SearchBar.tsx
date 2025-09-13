import { useState, useRef } from "react";
import Tekken8Logo from "@/shared/icons/gamesLogos/Tekken8Logo.png";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";

import Filter from "@/features/filter/Filter";
import style from "./SearchBar.module.scss";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterWindowRef = useRef<HTMLDivElement>(null);

  const handlerOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.SearchBar}>
      <div className={style.SearchBarWithFilterWindow}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Поиск..."
          className={`${isOpen ? style.InputIsOpen : style.InputIsClose}`}
        />

        <CSSTransition
          in={isOpen}
          timeout={100}
          nodeRef={filterWindowRef}
          classNames={{
            enter: style.IsOpen,
            enterActive: style.IsOpen,
            exit: style.IsClose,
            exitActive: style.IsClose,
          }}
          unmountOnExit
        >
          <div ref={filterWindowRef} className={style.FilterWindow}>
            <Image src={Tekken8Logo} alt="Tekken 8" width={50} />
          </div>
        </CSSTransition>
      </div>

      <Filter handlerOpen={handlerOpen} isOpen={isOpen} />
    </div>
  );
};

export default SearchBar;
