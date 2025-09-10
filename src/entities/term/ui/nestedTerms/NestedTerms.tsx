import { Term } from "@/entities/term/model/types";
import CheckTermInDescription from "@/entities/term/ui/checkTermInDescription/CheckTermInDescription";
import styles from "./NestedTerms.module.scss";
import CloseIcon from "@/shared/icons/close_icon.svg";
import ShowVideoIcon from "@/shared/icons/show_video.svg";

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
    <div className="NestedTerms">
      {currentNestedTerms.length > 0 && (
        <div>
          {currentNestedTerms.map((nestedTerm) => (
            <div className={styles.NestedTermsItem} key={nestedTerm.id}>
              <div className={styles.NestedTermsHeader}>
                <button
                  className={styles.NestedTermsCloseButton}
                  onClick={() => removeNestedTerm(parentTermId, nestedTerm.id)}
                >
                  <CloseIcon className={styles.NestedTermsCloseIcon} />
                </button>
                <h4>
                  {nestedTerm.original} ({nestedTerm.russian})
                </h4>
              </div>
              <div>
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
                  className={styles.NestedTermsVideoButton}
                  onClick={() =>
                    setOpenNestedVideoId(
                      openNestedVideoId === nestedTerm.id ? null : nestedTerm.id
                    )
                  }
                >
                  {openNestedVideoId === nestedTerm.id ? (
                    <ShowVideoIcon />
                  ) : (
                    <ShowVideoIcon />
                  )}
                </button>
              )}

              {openNestedVideoId === nestedTerm.id && nestedTerm.video && (
                <div className={styles.NestedTermsVideoContainer}>
                  <iframe
                    className={styles.NestedTermsVideo}
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
