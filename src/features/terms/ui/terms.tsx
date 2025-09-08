"use client";
import { useState } from "react";
import terms from "@/shared/date/terms.json";
import "./terms.scss";
import FilterSearch from "@/features/search/modal/FilterSearch";

interface TermsProps {
  searchInput: string;
}

const Terms = ({ searchInput }: TermsProps) => {
  const [openVideoId, setOpenVideoId] = useState<number | null>(null);

  const toggleVideo = (termId: number) => {
    setOpenVideoId(openVideoId === termId ? null : termId);
  };

  const filteredTerms = FilterSearch(terms, searchInput);

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
                  {term.description.split(" ").map((word, index) => (
                    <span className="TermInDescription-word" key={index}>
                      {word}{" "}
                    </span>
                  ))}
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
