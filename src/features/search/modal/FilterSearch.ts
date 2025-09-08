import type Term from "@/entities/term/model/types";

const FilterSearch = (terms: Term[], searchText: string): Term[] => {
  if (!searchText.trim()) return terms;

  const searchLower = searchText.toLowerCase();

  console.log("Render Terms");

  return terms.filter((term) => {
    const matchesOriginal = term.original.toLowerCase().includes(searchLower);
    const matchesRussian = term.russian.toLowerCase().includes(searchLower);
    const matchesAliases = term.aliases.some((alias) =>
      alias.toLowerCase().includes(searchLower)
    );

    return matchesOriginal || matchesRussian || matchesAliases;
  });
};

export default FilterSearch;
