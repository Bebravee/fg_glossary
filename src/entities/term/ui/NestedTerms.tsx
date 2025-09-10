import { Term } from "@/entities/term/model/types";
import CheckTermInDescription from "./checkTermInDescription";
import "./NestedTerms.scss";

interface NestedTermsProps {
  parentTermId: number;
  currentNestedTerms: Term[];
  removeNestedTerm: (parentTermId: number, nestedTermId: number) => void;
  addNestedTerm: (parentTermId: number, termToAdd: Term) => void;
  openNestedVideoId: number | null;
  setOpenNestedVideoId: React.Dispatch<React.SetStateAction<number | null>>;
  tokenize: (text: string) => string[];
  terms: Term[];
}

const NestedTerms = ({
  parentTermId,
  currentNestedTerms,
  removeNestedTerm,
  addNestedTerm,
  openNestedVideoId,
  setOpenNestedVideoId,
  tokenize,
  terms,
}: NestedTermsProps) => {
  return (
    <div>
      {currentNestedTerms.length > 0 && (
        <div className="Terms-nested-container">
          {currentNestedTerms.map((nestedTerm) => (
            <div key={nestedTerm.id} className="Terms-nested-item">
              <div className="Terms-nested-header">
                <button
                  className="Terms-nested-close"
                  onClick={() => removeNestedTerm(parentTermId, nestedTerm.id)}
                >
                  ×
                </button>
                <h4 className="Terms-content-name">
                  {nestedTerm.original} ({nestedTerm.russian})
                </h4>
              </div>
              <div className="Terms-nested-content-description">
                {tokenize(nestedTerm.description).map((part, index) => {
                  const isWord = /[a-zа-яё0-9]/i.test(part);

                  return isWord ? (
                    <CheckTermInDescription
                      key={index}
                      word={part}
                      terms={terms}
                      onTermClick={(clickedTerm) =>
                        addNestedTerm(parentTermId, clickedTerm)
                      }
                    />
                  ) : (
                    <span key={index}>{part}</span>
                  );
                })}
              </div>
              {nestedTerm.video && (
                <button
                  className="Terms-content-video-btn"
                  onClick={() =>
                    setOpenNestedVideoId(
                      openNestedVideoId === nestedTerm.id ? null : nestedTerm.id
                    )
                  }
                >
                  {openNestedVideoId === nestedTerm.id
                    ? "Скрыть видео"
                    : "Показать видео"}
                </button>
              )}

              {openNestedVideoId === nestedTerm.id && nestedTerm.video && (
                <div className="Terms-content-video-container">
                  <iframe
                    className="Terms-content-video"
                    src={nestedTerm.video}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedTerms;
