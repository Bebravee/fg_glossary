import { Term } from "@/entities/term/model/types";

const FilterSearch = (
  terms: Term[],
  searchText: string,
  filteredGames: string[]
): Term[] => {
  let filteredByGames = terms;
  if (filteredGames.length > 0) {
    filteredByGames = terms.filter((term) =>
      term.games.some((game) => filteredGames.includes(game))
    );
  }

  if (!searchText.trim()) return filteredByGames;

  const searchLower = searchText.toLowerCase();

  return filteredByGames.filter((term) => {
    const matchesOriginal = term.original.toLowerCase().includes(searchLower);
    const matchesRussian = term.russian.toLowerCase().includes(searchLower);
    const matchesAliases = term.aliases.some((alias) =>
      alias.toLowerCase().includes(searchLower)
    );

    return matchesOriginal || matchesRussian || matchesAliases;
  });
};

export default FilterSearch;
