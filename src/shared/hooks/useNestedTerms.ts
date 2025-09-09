import { useState, useCallback } from "react";
import { Term, NestedTerms } from "@/entities/term/model/types";

interface UseNestedTermsReturn {
  nestedTerms: Record<number, NestedTerms>;
  addNestedTerm: (parentTermId: number, termToAdd: Term) => void;
  removeNestedTerm: (parentTermId: number, termIdToRemove: number) => void;
  getNestedTerms: (termId: number) => Term[];
  clearNestedTerms: (termId: number) => void;
  hasNestedTerm: (parentTermId: number, termId: number) => boolean;
  getNestedTermsCount: (termId: number) => number;
}

const useNestedTerms = (): UseNestedTermsReturn => {
  const [nestedTerms, setNestedTerms] = useState<Record<number, NestedTerms>>(
    {}
  );

  const addNestedTerm = useCallback((parentTermId: number, termToAdd: Term) => {
    setNestedTerms((prev) => {
      const existingNested = prev[parentTermId];

      if (existingNested) {
        const alreadyExists = existingNested.terms.some(
          (t) => t.id === termToAdd.id
        );
        if (alreadyExists) {
          return prev;
        }

        return {
          ...prev,
          [parentTermId]: {
            ...existingNested,
            terms: [...existingNested.terms, termToAdd],
          },
        };
      } else {
        return {
          ...prev,
          [parentTermId]: {
            id: Date.now(),
            terms: [termToAdd],
          },
        };
      }
    });
  }, []);

  const removeNestedTerm = useCallback(
    (parentTermId: number, termIdToRemove: number) => {
      setNestedTerms((prev) => {
        const existingNested = prev[parentTermId];

        if (!existingNested) return prev;

        const updatedTerms = existingNested.terms.filter(
          (term) => term.id !== termIdToRemove
        );

        if (updatedTerms.length === 0) {
          const { [parentTermId]: _, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [parentTermId]: {
            ...existingNested,
            terms: updatedTerms,
          },
        };
      });
    },
    []
  );

  const getNestedTerms = useCallback(
    (termId: number): Term[] => {
      return nestedTerms[termId]?.terms || [];
    },
    [nestedTerms]
  );

  const clearNestedTerms = useCallback((termId: number) => {
    setNestedTerms((prev) => {
      const { [termId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const hasNestedTerm = useCallback(
    (parentTermId: number, termId: number): boolean => {
      return (
        nestedTerms[parentTermId]?.terms.some((term) => term.id === termId) ||
        false
      );
    },
    [nestedTerms]
  );

  const getNestedTermsCount = useCallback(
    (termId: number): number => {
      return nestedTerms[termId]?.terms.length || 0;
    },
    [nestedTerms]
  );

  return {
    nestedTerms,
    addNestedTerm,
    removeNestedTerm,
    getNestedTerms,
    clearNestedTerms,
    hasNestedTerm,
    getNestedTermsCount,
  };
};

export default useNestedTerms;
