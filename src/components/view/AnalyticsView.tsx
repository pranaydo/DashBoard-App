import React from "react";
import { Filters } from "../../type/types";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import SpendOverTime from "./charts/SpendOverTime";
import SendPerCat from "./charts/SpendPerCat";
import ChangeComparison from "./charts/ChangeComparison";
import StackedBarChart from "./charts/StackedBarChart";

interface AnalyticsViewProps {
  filters: Filters;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ filters }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "400px",
          [theme.breakpoints.up("md")]: {
            height: "450px",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Spend Over Time
        </Typography>
        <SpendOverTime filters={filters} />
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "400px",
          [theme.breakpoints.up("md")]: {
            height: "450px",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Spend per Category{" "}
        </Typography>

        <SendPerCat filters={filters} />
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "400px",
          [theme.breakpoints.up("md")]: {
            height: "450px",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          % Change vs Absolute Change Comparison
        </Typography>
        <ChangeComparison filters={filters} />
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "400px",
          [theme.breakpoints.up("md")]: {
            height: "450px",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Performance by Category (Stacked)
        </Typography>
        <StackedBarChart filters={filters} />
      </Paper>
    </Box>
  );
};

export default AnalyticsView;
