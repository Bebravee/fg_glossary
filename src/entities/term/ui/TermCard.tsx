"use client";
import CheckTermInDescription from "@/entities/term/ui/checkTermInDescription";
import NestedTerms from "@/entities/term/ui/NestedTerms";
import { Term } from "@/entities/term/model/types";

interface TermCardProps {
  term: Term;
  terms: Term[];
  isVideoOpen: boolean;
  toggleVideo: (termId: number) => void;
  currentNestedTerms: Term[];
  addNestedTerm: (parentTermId: number, termToAdd: Term) => void;
  removeNestedTerm: (parentTermId: number, nestedTermId: number) => void;
  openNestedVideoId: number | null;
  setOpenNestedVideoId: React.Dispatch<React.SetStateAction<number | null>>;
  tokenize: (text: string) => string[];
}

const TermCard = ({
  term,
  terms,
  isVideoOpen,
  toggleVideo,
  currentNestedTerms,
  addNestedTerm,
  removeNestedTerm,
  openNestedVideoId,
  setOpenNestedVideoId,
  tokenize,
}: TermCardProps) => {
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
                onTermClick={(clickedTerm) =>
                  addNestedTerm(term.id, clickedTerm)
                }
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

        <NestedTerms
          parentTermId={term.id}
          currentNestedTerms={currentNestedTerms}
          removeNestedTerm={removeNestedTerm}
          addNestedTerm={addNestedTerm}
          openNestedVideoId={openNestedVideoId}
          setOpenNestedVideoId={setOpenNestedVideoId}
          tokenize={tokenize}
          terms={terms}
        />
      </div>
    </div>
  );
};

export default TermCard;
