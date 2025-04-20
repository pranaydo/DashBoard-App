import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveBar } from "@nivo/bar";

interface SpendPerCatProps {
  filters: Filters;
}

const SpendPerCat: React.FC<SpendPerCatProps> = ({ filters }) => {
  const { user } = useUser();

  const filteredData = useMemo(() => {
    return user.data.filter((d) => {
      const matchesSector = !filters.sector || d.sector === filters.sector;
      const matchesCategory =
        !filters.category || d.category === filters.category;
      const matchesDate =
        (!filters.startDate ||
          new Date(d.date) >= new Date(filters.startDate)) &&
        (!filters.endDate || new Date(d.date) <= new Date(filters.endDate));
      return matchesSector && matchesCategory && matchesDate;
    });
  }, [user.data, filters]);

  // Group data by category
  const spendPerCategory = useMemo(() => {
    const groupedByCategory = filteredData.reduce(
      (acc: Record<string, number>, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.spend;
        return acc;
      },
      {}
    );

    return Object.entries(groupedByCategory).map(([category, spend]) => ({
      category,
      spend,
    }));
  }, [filteredData]);

  return (
    <ResponsiveBar
      data={spendPerCategory}
      keys={["spend"]}
      indexBy="category"
      margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legend: "Category",
        legendOffset: 40,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        legend: "Spend",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      tooltip={({ value, indexValue }) => (
        <div
          style={{
            padding: "8px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <strong>{indexValue}</strong>: {value}
        </div>
      )}
    />
  );
};

export default SpendPerCat;
