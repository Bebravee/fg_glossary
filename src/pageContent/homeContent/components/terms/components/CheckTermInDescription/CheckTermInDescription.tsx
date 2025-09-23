import { Term } from "@/shared/types/types";
import styles from "./CheckTermInDescription.module.scss";

interface Props {
  word: string;
  terms: Term[];
  onTermClick?: (term: Term) => void;
  currentTermId?: number;
}

export default function CheckTermInDescription({
  word,
  terms,
  onTermClick,
  currentTermId,
}: Props) {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[.,!?;:()«»"']/g, "")
      .trim();

  const lower = normalize(word);

  const found = terms.find(
    (t) =>
      normalize(t.original) === lower ||
      normalize(t.russian) === lower ||
      t.aliases.some((a) => normalize(a) === lower)
  );

  const isSelf = found?.id === currentTermId;

  return (
    <span
      className={found && !isSelf ? styles.highlight : ""}
      onClick={
        found && !isSelf && onTermClick ? () => onTermClick(found) : undefined
      }
    >
      {word}
    </span>
  );
}
