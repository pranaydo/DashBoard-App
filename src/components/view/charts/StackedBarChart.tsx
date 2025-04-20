import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";

interface StackedBarProps {
  filters: Filters;
}

const StackedBarChart: React.FC<StackedBarProps> = ({ filters }) => {
  const { user } = useUser();
  const theme = useTheme();

  // createee data into stacked format
  const chartData = useMemo(() => {
    const categoryMap = user.data.reduce((acc, item) => {
      if (!filters.sector || item.sector === filters.sector) {
        if (!acc[item.category]) {
          acc[item.category] = {
            spend: 0,
            percentChange: 0,
            absoluteChange: 0,
            count: 0,
          };
        }
        acc[item.category].spend += item.spend;
        acc[item.category].percentChange += item.percentChange;
        acc[item.category].absoluteChange += item.absoluteChange;
        acc[item.category].count += 1;
      }
      return acc;
    }, {} as Record<string, { spend: number; percentChange: number; absoluteChange: number; count: number }>);

    return Object.entries(categoryMap).map(([category, values]) => ({
      category,
      avgSpend: values.spend / values.count,
      avgPercentChange: values.percentChange / values.count,
      avgAbsoluteChange: values.absoluteChange / values.count,
    }));
  }, [user.data, filters.sector]);

  return (
    // <Paper elevation={3} sx={{ p: 2, height: "100%" }}>

    <Box sx={{ height: 400 }}>
      <ResponsiveBar
        data={chartData}
        keys={["avgSpend", "avgPercentChange", "avgAbsoluteChange"]}
        indexBy="category"
        layout="horizontal"
        margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
        ]}
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
        groupMode="stacked"
        tooltip={({ id, value, indexValue, color }) => (
          <Box
            sx={{
              p: 1,
              bgcolor: "background.paper",
              border: "1px solid #ddd",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: color,
                mr: 1,
              }}
            />
            <div>
              <strong>{indexValue}</strong>
              <div>
                {id}: {value}
              </div>
            </div>
          </Box>
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
            symbolSize: 12,
            effects: [
              {
                on: "hover",
                style: { itemOpacity: 1 },
              },
            ],
          },
        ]}
      />
    </Box>
    // </Paper>
  );
};

export default StackedBarChart;
