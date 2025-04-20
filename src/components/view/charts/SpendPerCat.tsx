import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import { applyFilters } from "../../../utils/FilterData";
const SpendPerCat: React.FC<{ filters: Filters }> = ({ filters }) => {
  const { user } = useUser();
  const selectedMetric = filters.metrics?.[0] ?? "mySpend";

  const filteredData = useMemo(() => {
    return applyFilters(user.data, filters);
  }, [user.data, filters]);

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    filteredData.forEach((entry) => {
      const metric = entry[selectedMetric as keyof typeof entry] as {
        current: number;
        reference: number;
        absoluteChange: number;
        percentChange: number;
      };

      const value = metric?.current || 0;
      grouped[entry.category] = (grouped[entry.category] || 0) + value;
    });

    return Object.entries(grouped).map(([category, spend]) => ({
      category,
      spend,
    }));
  }, [filteredData, selectedMetric]);

  return (
    <Box sx={{ height: 400 }}>
      <ResponsiveBar
        data={chartData}
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
    </Box>
  );
};

export default SpendPerCat;
