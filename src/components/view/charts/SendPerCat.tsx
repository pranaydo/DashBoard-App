import React, { useMemo } from "react";
import { Filters } from "../../../type/types";
import { useUser } from "../../../context/UserContext";
import { ResponsiveLine } from "@nivo/line";

interface SendPerCatProps {
  filters: Filters;
}
const SendPerCat: React.FC<SendPerCatProps> = ({ filters }) => {
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

  const spendOverTime = useMemo(() => {
    const groupedByDate = filteredData.reduce(
      (acc: Record<string, number>, curr) => {
        acc[curr.date] = (acc[curr.date] || 0) + curr.spend;
        return acc;
      },
      {}
    );

    return [
      {
        id: "Spend",
        data: Object.entries(groupedByDate).map(([date, value]) => ({
          x: date,
          y: value,
        })),
      },
    ];
  }, [filteredData]);

  return (
    <div style={{ height: 500 }}>
      <h3>Spend Over Time</h3>
      <ResponsiveLine
        data={spendOverTime}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Spend",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
        colors={{ scheme: "category10" }}
      />
    </div>
  );
};
export default SendPerCat;
