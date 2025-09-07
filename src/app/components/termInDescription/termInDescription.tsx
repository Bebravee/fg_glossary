import "./termInDescription.scss";

interface TermInDescriptionProps {
  description: string;
  russian: string;
  original: string;
  aliases: string[];
}

const TermInDescription = ({
  description,
  russian,
  original,
  aliases,
}: TermInDescriptionProps) => {
  return (
    <p className="TermInDescription">
      {description.split(" ").map((word, index) => (
        <span className="TermInDescription-word" key={index}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
};

export default TermInDescription;
