import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveLine } from "@nivo/line";

interface SpendOverTimeProps {
  filters: Filters;
}

const SpendOverTime: React.FC<SpendOverTimeProps> = ({ filters }) => {
  const { user } = useUser();

  const chartData = useMemo(() => {
    const groupedByDate = user.data
      .filter((d) => {
        const matchesSector = !filters.sector || d.sector === filters.sector;
        const matchesCategory =
          !filters.category || d.category === filters.category;
        const matchesDate =
          (!filters.startDate ||
            new Date(d.date) >= new Date(filters.startDate)) &&
          (!filters.endDate || new Date(d.date) <= new Date(filters.endDate));
        return matchesSector && matchesCategory && matchesDate;
      })
      .reduce((acc: Record<string, number>, curr) => {
        acc[curr.date] = (acc[curr.date] || 0) + curr.spend;
        return acc;
      }, {});

    return [
      {
        id: "Spend Over Time",
        data: Object.entries(groupedByDate)
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          )
          .map(([date, spend]) => ({ x: date, y: spend })),
      },
    ];
  }, [user.data, filters]);

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 20, right: 20, bottom: 90, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
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
        legendOffset: -50,
        legendPosition: "middle",
      }}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      useMesh={true}
    />
  );
};

export default SpendOverTime;
