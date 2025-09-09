import type { Term } from "@/entities/term/model/types";
import "./checkTermInDescription.scss";

interface CheckTermInDescriptionProps {
  word: string;
  terms: Term[];
}

const CheckTermInDescription = ({
  word,
  terms,
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

  const handleTermClick = (foundTerm: Term) => {
    console.log(foundTerm);
  };

  return (
    <span
      className={`Terms-content-description-word ${
        foundTerm ? "highlight" : ""
      }`}
      onClick={foundTerm ? () => handleTermClick(foundTerm) : undefined}
    >
      {word}
    </span>
  );
};

export default CheckTermInDescription;
