import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import { applyFilters } from "../../../utils/FilterData";

const StackedBarChart: React.FC<{ filters: Filters }> = ({ filters }) => {
  const { user } = useUser();
  const selectedMetric = filters.metrics?.[0] ?? "mySpend";

  const filteredData = useMemo(() => {
    return applyFilters(user.data, filters);
  }, [user.data, filters]);

  const chartData = useMemo(() => {
    const categoryMap = filteredData.reduce((acc, item) => {
      const cat = item.category;

      const m = item[selectedMetric as keyof typeof item] as {
        current: number;
        reference: number;
        absoluteChange: number;
        percentChange: number;
      };

      if (!acc[cat]) {
        acc[cat] = {
          Spend: 0,
          "% Change": 0,
          "Abs Change": 0,
          count: 0,
        };
      }

      acc[cat].Spend += m.current;
      acc[cat]["% Change"] += m.percentChange;
      acc[cat]["Abs Change"] += m.absoluteChange;
      acc[cat].count += 1;

      return acc;
    }, {} as Record<string, { Spend: number; "% Change": number; "Abs Change": number; count: number }>);

    return Object.entries(categoryMap).map(([category, values]) => ({
      category,
      Spend: values.Spend / values.count,
      "% Change": values["% Change"] / values.count,
      "Abs Change": values["Abs Change"] / values.count,
    }));
  }, [filteredData, selectedMetric]);

  return (
    <Box sx={{ height: 400 }}>
      <ResponsiveBar
        data={chartData}
        keys={["Spend", "% Change", "Abs Change"]}
        indexBy="category"
        layout="horizontal"
        margin={{ top: 50, right: 140, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "set2" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Value",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Category",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        groupMode="stacked"
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        tooltip={({ id, value, indexValue }) => (
          <div
            style={{
              padding: "8px",
              background: "white",
              border: "1px solid #ccc",
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

export default StackedBarChart;
