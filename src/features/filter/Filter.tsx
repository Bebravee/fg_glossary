import { useState } from "react";
import style from "./Filter.module.scss";
import FilterIcon from "@/shared/icons/filter_icon.svg";

interface FilterProps {
  handlerOpen: () => void;
  isOpen: boolean;
}

const Filter = ({ handlerOpen, isOpen }: FilterProps) => {
  return (
    <div className={style.Filter}>
      <FilterIcon
        onClick={handlerOpen}
        className={`${style.Icon} ${isOpen ? style.Open : style.Close}`}
      />
    </div>
  );
};

export default Filter;
