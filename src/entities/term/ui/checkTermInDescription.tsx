import type { Term } from "@/entities/term/model/types";
import "./checkTermInDescription.scss";

interface CheckTermInDescriptionProps {
  word: string;
  terms: Term[];
  onTermClick?: (term: Term) => void;
}

const CheckTermInDescription = ({
  word,
  terms,
  onTermClick,
}: CheckTermInDescriptionProps) => {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,!?;:()]/g, "")
      .trim();

  const lowerWord = normalize(word);

  const foundTerm = terms.find((term) => {
    if (normalize(term.original) === lowerWord) return true;
    if (normalize(term.russian) === lowerWord) return true;
    if (term.aliases?.some((alias) => normalize(alias) === lowerWord))
      return true;
    return false;
  });

  const handleTermClick = () => {
    if (foundTerm && onTermClick) {
      onTermClick(foundTerm);
    }
  };

  return (
    <span
      className={`Terms-content-description-word ${
        foundTerm ? "highlight" : ""
      }`}
      onClick={foundTerm ? handleTermClick : undefined}
    >
      {word}
    </span>
  );
};

export default CheckTermInDescription;
