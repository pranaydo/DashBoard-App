import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
} from "@mui/material";
import { useUser } from "../../context/UserContext";
import { Filters } from "../../type/types";
import { applyFilters } from "../../utils/FilterData";
import _ from "lodash";

interface MetricsTableProps {
  filters: Filters;
}

type SpendMetric =
  | "mySpend"
  | "sameStoreSpend"
  | "newStoreSpend"
  | "lostStoreSpend";

const allMetrics: SpendMetric[] = [
  "mySpend",
  "sameStoreSpend",
  "newStoreSpend",
  "lostStoreSpend",
];

const formatMetricName = (metric: string) =>
  metric
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());

const MetricsTable: React.FC<MetricsTableProps> = ({ filters }) => {
  const { user } = useUser();
  const [orderBy, setOrderBy] = useState<string>("sector");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const selectedMetrics: SpendMetric[] =
    Array.isArray(filters.metrics) && filters.metrics.length > 0
      ? (filters.metrics as SpendMetric[])
      : allMetrics;

  const groupBy = filters.attributes?.length ? filters.attributes : [];

  const filteredData = useMemo(
    () => applyFilters(user.data, filters),
    [user.data, filters]
  );

  const groupedData = useMemo(() => {
    if (groupBy.length === 0) {
      return filteredData.map((d, idx) => ({
        key: `${d.sector}-${d.category}-${idx}`,
        values: {
          sector: d.sector,
          category: d.category,
        },
        metrics: selectedMetrics.reduce((acc, metric) => {
          const m = d[metric];
          acc[metric] = {
            current: m.current,
            reference: m.reference,
            absoluteChange: m.absoluteChange,
            percentChange: m.percentChange,
          };
          return acc;
        }, {} as Record<SpendMetric, any>),
      }));
    }

    const grouped = _.groupBy(filteredData, (item) =>
      groupBy.map((key) => item[key as keyof typeof item]).join(" | ")
    );

    return Object.entries(grouped).map(([key, group]) => {
      const first = group[0];
      const values: Record<string, string> = {};
      groupBy.forEach((attr) => {
        values[attr] = first[attr as keyof typeof first] as string;
      });

      const metrics = selectedMetrics.reduce((acc, metric) => {
        const total = group.reduce(
          (sum, entry) => {
            const m = entry[metric];
            sum.current += m.current;
            sum.reference += m.reference;
            sum.absoluteChange += m.absoluteChange;
            sum.percentChange += m.percentChange;
            return sum;
          },
          { current: 0, reference: 0, absoluteChange: 0, percentChange: 0 }
        );

        acc[metric] = {
          current: total.current,
          reference: total.reference,
          absoluteChange: total.absoluteChange,
          percentChange: total.percentChange / group.length,
        };

        return acc;
      }, {} as Record<SpendMetric, any>);

      return {
        key,
        values,
        metrics,
      };
    });
  }, [filteredData, groupBy, selectedMetrics]);

  const sortedData = useMemo(() => {
    return [...groupedData].sort((a, b) => {
      let aVal = a.values[orderBy] || "";
      let bVal = b.values[orderBy] || "";

      selectedMetrics.forEach((metric) => {
        ["current", "reference", "absoluteChange", "percentChange"].forEach(
          (field) => {
            const key = `${metric}.${field}`;
            if (orderBy === key) {
              aVal = a.metrics[metric][field];
              bVal = b.metrics[metric][field];
            }
          }
        );
      });

      if (typeof aVal === "number" && typeof bVal === "number") {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      } else {
        return order === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }
    });
  }, [groupedData, order, orderBy, selectedMetrics]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedData, page, rowsPerPage]);

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {(groupBy.length > 0 ? groupBy : ["sector", "category"]).map(
                (attr) => (
                  <TableCell
                    key={attr}
                    rowSpan={2}
                    sx={{ fontWeight: "bold", fontSize: 13 }}
                  >
                    <TableSortLabel
                      active={orderBy === attr}
                      direction={orderBy === attr ? order : "asc"}
                      onClick={() => handleSort(attr)}
                    >
                      {attr.charAt(0).toUpperCase() + attr.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
              {selectedMetrics.map((metric) => (
                <TableCell
                  colSpan={4}
                  key={metric}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 13,
                    borderLeft: "1px solid #ddd",
                  }}
                >
                  {formatMetricName(metric)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {selectedMetrics.flatMap((metric) => [
                <TableCell key={`${metric}-current`} sx={{ fontSize: 13 }}>
                  <TableSortLabel
                    active={orderBy === `${metric}.current`}
                    direction={orderBy === `${metric}.current` ? order : "asc"}
                    onClick={() => handleSort(`${metric}.current`)}
                  >
                    Current
                  </TableSortLabel>
                </TableCell>,
                <TableCell key={`${metric}-reference`} sx={{ fontSize: 13 }}>
                  <TableSortLabel
                    active={orderBy === `${metric}.reference`}
                    direction={
                      orderBy === `${metric}.reference` ? order : "asc"
                    }
                    onClick={() => handleSort(`${metric}.reference`)}
                  >
                    Reference
                  </TableSortLabel>
                </TableCell>,
                <TableCell key={`${metric}-abs`} sx={{ fontSize: 13 }}>
                  <TableSortLabel
                    active={orderBy === `${metric}.absoluteChange`}
                    direction={
                      orderBy === `${metric}.absoluteChange` ? order : "asc"
                    }
                    onClick={() => handleSort(`${metric}.absoluteChange`)}
                  >
                    Abs
                  </TableSortLabel>
                </TableCell>,
                <TableCell key={`${metric}-pct`} sx={{ fontSize: 13 }}>
                  <TableSortLabel
                    active={orderBy === `${metric}.percentChange`}
                    direction={
                      orderBy === `${metric}.percentChange` ? order : "asc"
                    }
                    onClick={() => handleSort(`${metric}.percentChange`)}
                  >
                    %
                  </TableSortLabel>
                </TableCell>,
              ])}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={100}
                  align="center"
                  sx={{ py: 4, fontStyle: "italic", color: "gray" }}
                >
                  No data found for selected filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow key={row.key}>
                  {(groupBy.length > 0 ? groupBy : ["sector", "category"]).map(
                    (attr) => (
                      <TableCell key={attr} sx={{ fontSize: 13 }}>
                        {row.values[attr]}
                      </TableCell>
                    )
                  )}
                  {selectedMetrics.flatMap((metric) => {
                    const m = row.metrics[metric];
                    return [
                      <TableCell
                        key={`${row.key}-${metric}-current`}
                        sx={{ fontSize: 13 }}
                      >
                        {m.current}
                      </TableCell>,
                      <TableCell
                        key={`${row.key}-${metric}-reference`}
                        sx={{ fontSize: 13 }}
                      >
                        {m.reference}
                      </TableCell>,
                      <TableCell
                        key={`${row.key}-${metric}-abs`}
                        sx={{ fontSize: 13 }}
                      >
                        {m.absoluteChange}
                      </TableCell>,
                      <TableCell
                        key={`${row.key}-${metric}-pct`}
                        sx={{ fontSize: 13 }}
                      >
                        {m.percentChange?.toFixed(2)}%
                      </TableCell>,
                    ];
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ borderTop: "1px solid #eee", p: 1 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={sortedData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    </Paper>
  );
};

export default MetricsTable;
