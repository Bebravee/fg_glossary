"use client";

import terms from "@/shared/date/terms.json";
import { Term } from "@/shared/types/types";
import styles from "./Terms.module.scss";
import { useMemo } from "react";

interface TermsProps {
  searchInput?: string;
  filteredGames: string[];
}

const Terms = ({ searchInput, filteredGames }: TermsProps) => {
  const termsDisplay = (arr: Term[]) => {
    return arr.map((term) => (
      <div key={term.id} className={styles.TermsElement}>
        <h1 className={styles.TermsElementName}>
          {term.original} {`(${term.russian})`}
        </h1>
        <p className={styles.TermsElementDescription}>{term.description}</p>
        {term.video && <div className={styles.TermsElementVideo}></div>}
      </div>
    ));
  };

  const filteredTerms = useMemo(() => {
    if (!searchInput && filteredGames.length === 0) {
      return terms;
    }

    return terms.filter((term) => {
      const hasSearchMatch = searchInput
        ? term.original.toLowerCase().includes(searchInput.toLowerCase()) ||
          term.russian.toLowerCase().includes(searchInput.toLowerCase()) ||
          term.aliases.some((alias) =>
            alias.toLowerCase().includes(searchInput.toLowerCase())
          )
        : true;

      const hasGameMatch =
        filteredGames.length > 0
          ? term.games.some((game) => filteredGames.includes(game))
          : true;

      return hasSearchMatch && hasGameMatch;
    });
  }, [searchInput, filteredGames]);

  if (searchInput && filteredTerms.length === 0) {
    return (
      <div className={styles.Terms}>
        <p>По запросу "{searchInput}" ничего не найдено</p>
      </div>
    );
  }

  return <div className={styles.Terms}>{termsDisplay(filteredTerms)}</div>;
};

export default Terms;
