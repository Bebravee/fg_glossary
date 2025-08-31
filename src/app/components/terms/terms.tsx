"use client";

import { useState, useEffect } from "react";

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

const Terms = ({ searchInput }: TermsProps) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<Term[]>([]);

  useEffect(() => {
    fetch("/terms.json")
      .then((res) => res.json())
      .then((data) => setTerms(data))
      .catch((err) => console.error("Ошибка загрузки JSON:", err));
  }, []);

  useEffect(() => {
    const lowerInput = searchInput.toLowerCase().trim();

    if (!lowerInput) {
      setFilteredTerms(terms);
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

    setFilteredTerms(results);
  }, [searchInput, terms]);

  return (
    <div className="Terms">
      {filteredTerms.length > 0 ? (
        filteredTerms.map((term) => (
          <div key={term.original} className="Terms-content">
            <h1>
              {term.original} {term.russian && <span>({term.russian})</span>}
            </h1>
            <p>{term.description}</p>
            {term.video && (
              <iframe
                src={term.video}
                title={term.original}
                width="560"
                height="315"
                allowFullScreen
              />
            )}
          </div>
        ))
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
};

export default Terms;
