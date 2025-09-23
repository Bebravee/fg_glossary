"use client";
import { useState, useMemo, useEffect } from "react";
import terms from "@/shared/date/terms.json";
import { Term } from "@/shared/types/types";
import styles from "./Terms.module.scss";

import CheckTermInDescription from "./components/CheckTermInDescription/CheckTermInDescription";
import NestedTerms from "./components/NestedTerms/NestedTerms";

interface TermsProps {
  searchInput?: string;
  filteredGames: string[];
}

const Terms = ({ searchInput, filteredGames }: TermsProps) => {
  const [openVideoId, setOpenVideoId] = useState<number | null>(null);
  const [openNestedVideoId, setOpenNestedVideoId] = useState<number | null>(
    null
  );
  const [nestedTerms, setNestedTerms] = useState<Record<number, Term[]>>({});

  useEffect(() => {
    setNestedTerms({});
    setOpenVideoId(null);
    setOpenNestedVideoId(null);
  }, [searchInput]);

  const handlerSetVideo = () => {};

  const addNestedTerm = (parentTermId: number, termToAdd: Term) => {
    if (parentTermId === termToAdd.id) return;
    setNestedTerms((prev) => {
      const current = prev[parentTermId] || [];
      if (current.some((t) => t.id === termToAdd.id)) return prev;
      return { ...prev, [parentTermId]: [...current, termToAdd] };
    });
  };

  const tokenize = (text: string) =>
    text.split(/(\s+|[.,!?;:()«»"'])/).filter(Boolean);

  const filteredTerms = useMemo(() => {
    if (!searchInput && filteredGames.length === 0) return terms;
    return terms.filter((term) => {
      const s = searchInput?.toLowerCase() ?? "";
      const matchSearch = s
        ? term.original.toLowerCase().includes(s) ||
          term.russian.toLowerCase().includes(s) ||
          term.aliases.some((a) => a.toLowerCase().includes(s))
        : true;
      const matchGame =
        filteredGames.length > 0
          ? term.games.some((g) => filteredGames.includes(g))
          : true;
      return matchSearch && matchGame;
    });
  }, [searchInput, filteredGames]);

  if (searchInput && filteredTerms.length === 0) {
    return (
      <div className={styles.Terms}>
        <p>По запросу "{searchInput}" ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className={styles.Terms}>
      {filteredTerms.map((term) => {
        const isVideoOpen = openVideoId === term.id;
        const currentNestedTerms = nestedTerms[term.id] || [];

        return (
          <div key={term.id} className={styles.TermsElement}>
            <h1 className={styles.TermsElementName}>
              {term.original} ({term.russian})
            </h1>

            <div className={styles.TermsElementDescription}>
              {tokenize(term.description).map((part, i) => {
                const isWord = /[a-zа-яё0-9]/i.test(part);
                return isWord ? (
                  <CheckTermInDescription
                    key={i}
                    word={part}
                    terms={terms}
                    currentTermId={term.id}
                    onTermClick={(clicked) => addNestedTerm(term.id, clicked)}
                  />
                ) : (
                  <span key={i}>{part}</span>
                );
              })}
            </div>

            {term.video && (
              <div className={styles.TermsElementVideo}>
                <button
                  onClick={() => setOpenVideoId(isVideoOpen ? null : term.id)}
                >
                  {isVideoOpen ? "Скрыть видео" : "Показать видео"}
                </button>
                {isVideoOpen && (
                  <iframe src={term.video} loading="lazy"></iframe>
                )}
              </div>
            )}

            {currentNestedTerms.length > 0 && (
              <NestedTerms
                parentTermId={term.id}
                currentNestedTerms={currentNestedTerms}
                removeNestedTerm={(parentId, nestedId) =>
                  setNestedTerms((prev) => ({
                    ...prev,
                    [parentId]: (prev[parentId] || []).filter(
                      (t) => t.id !== nestedId
                    ),
                  }))
                }
                addNestedTerm={addNestedTerm}
                openNestedVideoId={openNestedVideoId}
                setOpenNestedVideoId={setOpenNestedVideoId}
                tokenize={tokenize}
                terms={terms}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Terms;
