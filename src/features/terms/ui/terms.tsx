"use client";
import { useState, useEffect } from "react";
import terms from "@/shared/date/terms.json";
import "./terms.scss";
import FilterSearch from "@/features/search/modal/FilterSearch";
import TermCard from "@/entities/term/ui/TermCard";
import { Term } from "@/entities/term/model/types";

interface TermsProps {
  searchInput: string;
}

const Terms = ({ searchInput }: TermsProps) => {
  const [openVideoId, setOpenVideoId] = useState<number | null>(null);
  const [openNestedVideoId, setOpenNestedVideoId] = useState<number | null>(
    null
  );
  const [nestedTerms, setNestedTerms] = useState<Record<number, Term[]>>({});

  useEffect(() => {
    setNestedTerms({});
    setOpenVideoId(null);
    setOpenNestedVideoId(null);
  }, [searchInput]);

  const toggleVideo = (termId: number) => {
    setOpenVideoId(openVideoId === termId ? null : termId);
  };

  const addNestedTerm = (parentTermId: number, termToAdd: Term) => {
    if (parentTermId === termToAdd.id) return;

    setNestedTerms((prev) => {
      const currentNestedTerms = prev[parentTermId] || [];

      if (currentNestedTerms.some((term) => term.id === termToAdd.id)) {
        return prev;
      }

      return {
        ...prev,
        [parentTermId]: [...currentNestedTerms, termToAdd],
      };
    });
  };

  const removeNestedTerm = (parentTermId: number, termIdToRemove: number) => {
    setNestedTerms((prev) => ({
      ...prev,
      [parentTermId]: (prev[parentTermId] || []).filter(
        (term) => term.id !== termIdToRemove
      ),
    }));
  };

  const filteredTerms = FilterSearch(terms, searchInput);

  const tokenize = (text: string) => {
    return text.split(/(\s+|[.,!?;:()«»"'])/).filter(Boolean);
  };

  return (
    <div className="Terms">
      {filteredTerms.length === 0 ? (
        <div className="Terms-no-results">
          Ничего не найдено по запросу: &quot;{searchInput}&quot;
        </div>
      ) : (
        filteredTerms.map((term) => {
          const isVideoOpen = openVideoId === term.id;
          const currentNestedTerms = nestedTerms[term.id] || [];

          return (
            <TermCard
              key={term.id}
              term={term}
              terms={terms}
              isVideoOpen={isVideoOpen}
              toggleVideo={toggleVideo}
              currentNestedTerms={currentNestedTerms}
              addNestedTerm={addNestedTerm}
              removeNestedTerm={removeNestedTerm}
              openNestedVideoId={openNestedVideoId}
              setOpenNestedVideoId={setOpenNestedVideoId}
              tokenize={tokenize}
            />
          );
        })
      )}
    </div>
  );
};

export default Terms;
