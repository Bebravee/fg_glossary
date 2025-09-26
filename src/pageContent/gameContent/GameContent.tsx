import { useState } from "react";
import terms from "@/shared/date/terms.json";
import styles from "./GameContent.module.scss";

const GameContent = () => {
  const [score, setScore] = useState(0);
  const [terms, setPastTermsId] = useState([]);

  return (
    <div className={styles.GameContent}>
      <h1>Выберите правильный вариант</h1>
      <div>{terms.filter((term) => {})}</div>
      <div></div>
    </div>
  );
};

export default GameContent;
