import { Filters } from "../type/types";

export function applyFilters<
  T extends {
    sector: string;
    category: string;
    startDate: string;
    endDate: string;
  }
>(data: T[], filters: Filters): T[] {
  // return if no filters are applied for imprving  performance
  const hasActiveFilters =
    filters.sector || filters.category || filters.startDate || filters.endDate;

  if (!hasActiveFilters) return data;

  return data.filter((d) => {
    const matchesSector = !filters.sector || d.sector === filters.sector;
    const matchesCategory =
      !filters.category || d.category === filters.category;
    const matchesDate =
      (!filters.startDate ||
        new Date(d.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(d.endDate) <= new Date(filters.endDate));

    return matchesSector && matchesCategory && matchesDate;
  });
}
