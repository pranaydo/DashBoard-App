import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import { applyFilters } from "../../../utils/FilterData";

const ChangeComparison: React.FC<{ filters: Filters }> = ({ filters }) => {
  const { user } = useUser();

  const selectedMetric = filters.metrics?.[0] ?? "mySpend";

  const filteredData = useMemo(() => {
    return applyFilters(user.data, filters);
  }, [user.data, filters]);

  const chartData = useMemo(() => {
    const grouped = filteredData.reduce((acc, entry) => {
      const cat = entry.category;
      const metric = entry[selectedMetric as keyof typeof entry] as {
        current: number;
        reference: number;
        absoluteChange: number;
        percentChange: number;
      };

      if (!acc[cat]) acc[cat] = { abs: [], pct: [] };
      acc[cat].abs.push(metric.absoluteChange);
      acc[cat].pct.push(metric.percentChange);

      return acc;
    }, {} as Record<string, { abs: number[]; pct: number[] }>);

    return Object.entries(grouped).map(([category, { abs, pct }]) => ({
      category,
      "Abs Change": abs.reduce((a, b) => a + b, 0) / abs.length,
      "% Change": pct.reduce((a, b) => a + b, 0) / pct.length,
    }));
  }, [filteredData, selectedMetric]);

  return (
    <Box sx={{ height: 400 }}>
      <ResponsiveBar
        data={chartData}
        keys={["Abs Change", "% Change"]}
        indexBy="category"
        margin={{ top: 30, right: 140, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={({ id }) => (id === "% Change" ? "#1f77b4" : "#ff7f0e")}
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
          legend: "Change",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        tooltip={({ id, value, indexValue }) => (
          <div
            style={{
              padding: "10px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <strong>{indexValue}</strong>
            <br />
            {id}: {value}
          </div>
        )}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 12,
            effects: [{ on: "hover", style: { itemOpacity: 1 } }],
          },
        ]}
      />
    </Box>
  );
};

export default ChangeComparison;
