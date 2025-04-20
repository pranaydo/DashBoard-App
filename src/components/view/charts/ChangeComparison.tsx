import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveBar } from "@nivo/bar";
import { Box, Paper, Typography } from "@mui/material";

interface ChangeComparisonProps {
  filters: Filters;
}

const ChangeComparison: React.FC<ChangeComparisonProps> = ({ filters }) => {
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

  //  (average % change vs absolute change by category)
  const comparisonData = useMemo(() => {
    const categoryData = filteredData.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = {
          percentChanges: [],
          absoluteChanges: [],
          count: 0,
        };
      }
      acc[curr.category].percentChanges.push(curr.percentChange);
      acc[curr.category].absoluteChanges.push(curr.absoluteChange);
      acc[curr.category].count += 1;
      return acc;
    }, {} as Record<string, { percentChanges: number[]; absoluteChanges: number[]; count: number }>);

    return Object.entries(categoryData).map(([category, data]) => ({
      category,
      avgPercentChange:
        data.percentChanges.reduce((sum, val) => sum + val, 0) / data.count,
      avgAbsoluteChange:
        data.absoluteChanges.reduce((sum, val) => sum + val, 0) / data.count,
    }));
  }, [filteredData]);

  return (
    <Box sx={{ height: 500 }}>
      <ResponsiveBar
        data={comparisonData}
        keys={["avgPercentChange", "avgAbsoluteChange"]}
        indexBy="category"
        margin={{ top: 30, right: 150, bottom: 130, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={({ id }) => (id === "avgPercentChange" ? "#1f77b4" : "#ff7f0e")}
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
          legend: "Value",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        tooltip={({ id, value, indexValue }) => (
          <div
            style={{
              padding: "12px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <div>
              <strong>{indexValue}</strong>
            </div>
            <div>
              {id}: {value}
            </div>
          </div>
        )}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default ChangeComparison;
