"use client";
import CheckTermInDescription from "@/entities/term/ui/checkTermInDescription/CheckTermInDescription";
import NestedTerms from "@/entities/term/ui/nestedTerms/NestedTerms";
import { Term } from "@/entities/term/model/types";

import styles from "./TermCard.module.scss";
import ShowVideoIcon from "@/shared/icons/show_video.svg";

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
    <div className={styles.TermsCard} key={term.id}>
      <h1 className={styles.TermsCardName}>
        {term.original} ({term.russian})
      </h1>

      <div className={styles.TermsCardContainer}>
        <div className={styles.TermsCardDescription}>
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
            className={styles.TermsCardVideoButton}
            onClick={() => toggleVideo(term.id)}
          >
            {isVideoOpen ? <ShowVideoIcon /> : <ShowVideoIcon />}
          </button>
        )}

        {isVideoOpen && term.video && (
          <div className={styles.TermsCardVideoContainer}>
            <iframe
              className={styles.TermsCardVideo}
              src={term.video}
              loading="lazy"
              referrerPolicy="no-referrer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {currentNestedTerms.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default TermCard;
