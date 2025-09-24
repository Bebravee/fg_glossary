import { useState } from "react";

import SingleArrow from "./icons/single_arrow.svg";
import DoubleArrow from "./icons/double_arrows.svg";
import styles from "./pagination.module.scss";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className={styles.Pagination}>
      <div className={styles.PaginationLeft}>
        <DoubleArrow />
        <SingleArrow />
      </div>

      <div></div>
    </div>
  );
};

export default Pagination;
