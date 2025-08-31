"use client";

import { useState, useEffect } from "react";
import "./terms.scss";

interface TermsProps {
  searchInput: string;
}

interface Term {
  original: string;
  russian?: string;
  description: string;
  aliases?: string[];
  nestedTerms?: string[];
  video?: string;
}

interface TermWithNested extends Term {
  nestedLevel: number;
}

const Terms = ({ searchInput }: TermsProps) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<TermWithNested[]>([]);
  const [expandedNestedTerms, setExpandedNestedTerms] = useState<
    Record<string, TermWithNested[]>
  >({});

  useEffect(() => {
    fetch("/terms.json")
      .then((res) => res.json())
      .then((data) => setTerms(data))
      .catch((err) => console.error("Ошибка загрузки JSON:", err));
  }, []);

  useEffect(() => {
    const lowerInput = searchInput.toLowerCase().trim();

    if (!lowerInput) {
      setFilteredTerms(terms.map((term) => ({ ...term, nestedLevel: 0 })));
      return;
    }

    const results = terms.filter((term) => {
      const original = term.original.toLowerCase();
      const russian = term.russian?.toLowerCase() || "";
      const aliases = term.aliases?.map((a) => a.toLowerCase()) || [];

      return (
        original.includes(lowerInput) ||
        russian.includes(lowerInput) ||
        aliases.some((alias) => alias.includes(lowerInput))
      );
    });

    setFilteredTerms(results.map((term) => ({ ...term, nestedLevel: 0 })));
  }, [searchInput, terms]);

  // Функция для поиска термина по названию или алиасу
  const findTermByText = (text: string): Term | null => {
    const lowerText = text.toLowerCase().trim();

    for (const term of terms) {
      if (term.original.toLowerCase() === lowerText) return term;

      if (term.russian && term.russian.toLowerCase() === lowerText) return term;

      if (
        term.aliases &&
        term.aliases.some((alias) => alias.toLowerCase() === lowerText)
      )
        return term;
    }

    return null;
  };

  const extractTermsFromDescription = (description: string): Term[] => {
    const foundTerms: Term[] = [];

    terms.forEach((term) => {
      if (description.includes(term.original)) {
        foundTerms.push(term);
        return;
      }

      if (term.russian && description.includes(term.russian)) {
        foundTerms.push(term);
        return;
      }

      if (term.aliases) {
        for (const alias of term.aliases) {
          if (description.includes(alias)) {
            foundTerms.push(term);
            return;
          }
        }
      }
    });

    return foundTerms;
  };

  const handleTermClick = (termText: string, parentTerm: TermWithNested) => {
    const foundTerm = findTermByText(termText);

    if (!foundTerm) return;

    const parentKey = `${parentTerm.original}-${parentTerm.nestedLevel}`;
    const existingNested = expandedNestedTerms[parentKey] || [];

    if (existingNested.some((t) => t.original === foundTerm.original)) {
      return;
    }

    const nestedTerm: TermWithNested = {
      ...foundTerm,
      nestedLevel: parentTerm.nestedLevel + 1,
    };

    setExpandedNestedTerms((prev) => ({
      ...prev,
      [parentKey]: [...existingNested, nestedTerm],
    }));
  };

  const renderDescriptionWithClickableTerms = (
    description: string,
    parentTerm: TermWithNested
  ) => {
    const termPatterns: string[] = [];

    terms.forEach((term) => {
      if (term.original) termPatterns.push(term.original);
      if (term.russian) termPatterns.push(term.russian);
      if (term.aliases) termPatterns.push(...term.aliases);
    });

    termPatterns.sort((a, b) => b.length - a.length);

    const escapedPatterns = termPatterns.map((pattern) =>
      pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const regex = new RegExp(`(${escapedPatterns.join("|")})`, "gi");

    const parts = description.split(regex);

    return (
      <p>
        {parts.map((part, index) => {
          const foundTerm = findTermByText(part);

          if (foundTerm) {
            return (
              <span
                key={index}
                className="Terms-nested-word"
                onClick={() => handleTermClick(part, parentTerm)}
              >
                {part}
              </span>
            );
          }

          return part;
        })}
      </p>
    );
  };

  const closeAllNestedTerms = () => {
    setExpandedNestedTerms({});
  };

  const renderTerm = (term: TermWithNested) => {
    const key = `${term.original}-${term.nestedLevel}`;
    const nestedTerms = expandedNestedTerms[key] || [];

    return (
      <div
        key={key}
        className={`Terms-content ${term.nestedLevel > 0 ? "nested" : ""}`}
      >
        <h1>
          {term.original} {term.russian && <span>({term.russian})</span>}
        </h1>
        {renderDescriptionWithClickableTerms(term.description, term)}
        {term.video && (
          <iframe
            src={term.video}
            title={term.original}
            width="560"
            height="315"
            allowFullScreen
          />
        )}

        {nestedTerms.map((nestedTerm) => renderTerm(nestedTerm))}
      </div>
    );
  };

  return (
    <div className="Terms">
      {filteredTerms.length > 0 ? (
        <>
          {filteredTerms.map((term) => renderTerm(term))}

          {Object.keys(expandedNestedTerms).length > 0 && (
            <button
              className="Terms-closed-nested"
              onClick={closeAllNestedTerms}
            >
              Закрыть все дополнительные термины
            </button>
          )}
        </>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};

export default Terms;
