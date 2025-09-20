"use client";
import { useState } from "react";
import terms from "@/shared/date/terms.json";
import { Term } from "@/shared/types/types";
import styles from "./Terms.module.scss";
import { useMemo } from "react";

interface TermsProps {
  searchInput?: string;
  filteredGames: string[];
}

const Terms = ({ searchInput, filteredGames }: TermsProps) => {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const checkFullWord = (word: string) => {};

  const handlerCheckWord = (word: string) => {
    const hasMatch = terms.some(
      (term) =>
        term.original.includes(word) ||
        term.russian.includes(word) ||
        term.aliases.includes(word)
    );

    if (hasMatch) console.log(word);

    return hasMatch;
  };

  const handlerDescription = (description: string) => {
    const splitedDescription = description.split(" ");

    return splitedDescription.map((word, index) => (
      <span
        key={index}
        className={`${styles.DescriptionWord} ${
          handlerCheckWord(word) && styles.DescriptionWordHighlighter
        }`}
      >
        {word}
        {index < splitedDescription.length - 1 && " "}
      </span>
    ));
  };

  const termsDisplay = (arr: Term[]) => {
    return arr.map((term) => (
      <div key={term.id} className={styles.TermsElement}>
        <h1 className={styles.TermsElementName}>
          {term.original} {`(${term.russian})`}
        </h1>
        <p className={styles.TermsElementDescription}>
          {handlerDescription(term.description)}
        </p>
        {term.video && (
          <div className={styles.TermsElementVideo}>
            <button
              onClick={() => {
                setActiveVideoId(term.id === activeVideoId ? null : term.id);
              }}
            >
              {activeVideoId === term.id ? "Скрыть видео" : "Показать видео"}
            </button>

            {activeVideoId === term.id && <iframe src={term.video}></iframe>}
          </div>
        )}
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
