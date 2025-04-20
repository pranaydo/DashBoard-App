import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import { applyFilters } from "../../../utils/FilterData";

const SpendOverTime: React.FC<{ filters: Filters }> = ({ filters }) => {
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
      const date = entry.startDate;
      const value = metric?.current || 0;
      grouped[date] = (grouped[date] || 0) + value;
    });

    return [
      {
        id: selectedMetric,
        data: Object.entries(grouped)
          .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
          .map(([x, y]) => ({ x, y })),
      },
    ];
  }, [filteredData, selectedMetric]);

  return (
    <Box sx={{ height: 400 }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 80, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: "Date",
          legendOffset: 60,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Spend",
          legendOffset: -65,
          legendPosition: "middle",
        }}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        useMesh
        tooltip={({ point }) => (
          <div
            style={{
              padding: "8px",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <strong>{point.serieId}</strong>: {point.data.yFormatted}
          </div>
        )}
      />
    </Box>
  );
};

export default SpendOverTime;
