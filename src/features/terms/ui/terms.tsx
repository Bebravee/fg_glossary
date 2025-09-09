"use client";
import { useState } from "react";
import terms from "@/shared/date/terms.json";
import "./terms.scss";
import FilterSearch from "@/features/search/modal/FilterSearch";
import CheckTermInDescription from "@/entities/term/ui/checkTermInDescription";
import useNestedTerms from "@/shared/hooks/useNestedTerms";

interface TermsProps {
  searchInput: string;
}

const Terms = ({ searchInput }: TermsProps) => {
  const [openVideoId, setOpenVideoId] = useState<number | null>(null);
  const { addNestedTerm, removeNestedTerm, getNestedTerms, clearNestedTerms } =
    useNestedTerms();

  const toggleVideo = (termId: number) => {
    setOpenVideoId(openVideoId === termId ? null : termId);
  };

  const filteredTerms = FilterSearch(terms, searchInput);

  const tokenize = (text: string) => {
    return text.split(/(\s+|[.,!?;:()«»"'])/).filter(Boolean);
  };

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
                <div className="Terms-content-description">
                  {tokenize(term.description).map((part, index) => {
                    const isWord = /[a-zа-яё0-9]/i.test(part);

                    return isWord ? (
                      <CheckTermInDescription
                        key={index}
                        word={part}
                        terms={terms}
                      />
                    ) : (
                      <span key={index}>{part}</span>
                    );
                  })}
                </div>
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
