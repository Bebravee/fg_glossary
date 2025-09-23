import { Term } from "@/shared/types/types";
import CheckTermInDescription from "../CheckTermInDescription/CheckTermInDescription";
import styles from "./NestedTerms.module.scss";

interface Props {
  parentTermId: number;
  currentNestedTerms: Term[];
  removeNestedTerm: (parentId: number, nestedId: number) => void;
  addNestedTerm: (parentId: number, termToAdd: Term) => void;
  openNestedVideoId: number | null;
  setOpenNestedVideoId: React.Dispatch<React.SetStateAction<number | null>>;
  tokenize: (text: string) => string[];
  terms: Term[];
}

export default function NestedTerms({
  parentTermId,
  currentNestedTerms,
  removeNestedTerm,
  addNestedTerm,
  openNestedVideoId,
  setOpenNestedVideoId,
  tokenize,
  terms,
}: Props) {
  return (
    <div className={styles.NestedTerms}>
      {currentNestedTerms.map((nested) => {
        const isOpen = openNestedVideoId === nested.id;
        return (
          <div key={nested.id} className={styles.NestedItem}>
            <div className={styles.NestedHeader}>
              <button
                className={styles.CloseVideoButton}
                onClick={() => removeNestedTerm(parentTermId, nested.id)}
              >
                ✕
              </button>
              <h4>
                {nested.original} ({nested.russian})
              </h4>
            </div>

            <div className={styles.NestedDescription}>
              {tokenize(nested.description).map((part, i) => {
                const isWord = /[a-zа-яё0-9]/i.test(part);
                return isWord ? (
                  <CheckTermInDescription
                    key={i}
                    word={part}
                    terms={terms}
                    currentTermId={nested.id}
                    onTermClick={(clicked) =>
                      addNestedTerm(parentTermId, clicked)
                    }
                  />
                ) : (
                  <span key={i}>{part}</span>
                );
              })}
            </div>

            {nested.video && (
              <button
                className={styles.OpenVideoButton}
                onClick={() => setOpenNestedVideoId(isOpen ? null : nested.id)}
              >
                {isOpen ? "Скрыть видео" : "Показать видео"}
              </button>
            )}

            {isOpen && (
              <div>
                {isOpen && <iframe src={nested.video} loading="lazy"></iframe>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
