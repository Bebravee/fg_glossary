"use client";
import { useState } from "react";
import terms from "./terms.json";
import "./terms.scss";
import TermInDescription from "../termInDescription/termInDescription";

interface TermsProps {
  searchInput: string;
}

interface NestedTerm {
  id: number;
  original: string;
  russian: string;
  description: string;
}

interface Term {
  id: number;
  original: string;
  russian: string;
  description: string;
  aliases: string[];
  nestedTerms: NestedTerm[];
  video?: string;
}

const Terms = ({ searchInput }: TermsProps) => {
  const [openVideoId, setOpenVideoId] = useState<number | null>(null);

  const toggleVideo = (termId: number) => {
    setOpenVideoId(openVideoId === termId ? null : termId);
  };

  const filterTerms = (terms: Term[], searchText: string): Term[] => {
    if (!searchText.trim()) return terms;

    const searchLower = searchText.toLowerCase();

    return terms.filter((term) => {
      const matchesOriginal = term.original.toLowerCase().includes(searchLower);
      const matchesRussian = term.russian.toLowerCase().includes(searchLower);
      const matchesAliases = term.aliases.some((alias) =>
        alias.toLowerCase().includes(searchLower)
      );

      return matchesOriginal || matchesRussian || matchesAliases;
    });
  };

  const filteredTerms = filterTerms(terms, searchInput);

  return (
    <div className="Terms">
      {filteredTerms.length === 0 ? (
        <div className="Terms-no-results">
          Ничего не найдено по запросу: &quot;{searchInput}&quot;
        </div>
      ) : (
        filteredTerms.map((term) => {
          const isVideoOpen = openVideoId === term.id;

          return (
            <div className="Terms-content" key={term.id}>
              <h1 className="Terms-content-name">
                {term.original} ({term.russian})
              </h1>
              <div className="Terms-content-container">
                <p className="Terms-content-description">
                  <TermInDescription
                    description={term.description}
                    original={term.original}
                    russian={term.russian}
                    aliases={term.aliases}
                  />
                </p>
                {term.video && (
                  <button
                    className="Terms-content-video-btn"
                    onClick={() => toggleVideo(term.id)}
                  >
                    {isVideoOpen ? "Скрыть видео" : "Показать видео"}
                  </button>
                )}

                {isVideoOpen && term.video && (
                  <div className="Terms-content-video-container">
                    <iframe
                      className="Terms-content-video"
                      src={term.video}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Terms;
