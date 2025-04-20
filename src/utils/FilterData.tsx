import { Filters } from "../type/types";

export function applyFilters<
  T extends {
    sector: string;
    category: string;
    startDate: string;
    endDate: string;
  }
>(data: T[], filters: Filters): T[] {
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
