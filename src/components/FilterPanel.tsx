import React from "react";
import { Box, TextField, MenuItem, Autocomplete } from "@mui/material";
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import AdapterDateFns from '@date-io/date-fns';
import { Filters } from "../type/types";

interface FiltersPanelProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const sectorOptions = ["Retail", "Food", "Industrial"];
const categoryOptions = ["Juice", "Snacks"];
const metricOptions = ["spend", "reference", "percentChange", "absoluteChange"];
const attributeOptions = ["country", "sector", "category"];

const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, setFilters }) => {
  const today = new Date();
  const twelveMonthsAgo = new Date(today);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box display="flex" gap={2} mt={2} flexWrap="wrap">
      <TextField
        label="Sector"
        select
        value={filters.sector || ""}
        onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
        sx={{ minWidth: 200 }}
      >
        {sectorOptions.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Category"
        select
        value={filters.category || ""}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        sx={{ minWidth: 200 }}
      >
        {categoryOptions.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      {/*
        <DatePicker
          label="Start Date"
          value={filters.startDate ? new Date(filters.startDate) : null}
          onChange={(date: Date | null) =>
            setFilters({ ...filters, startDate: date?.toISOString().split('T')[0] })
          }
          disableFuture
          minDate={twelveMonthsAgo}
          maxDate={today}
          slotProps={{ textField: { size: 'medium' } }}
        />

        <DatePicker
          label="End Date"
          value={filters.endDate ? new Date(filters.endDate) : null}
          onChange={(date: Date | null) =>
            setFilters({ ...filters, endDate: date?.toISOString().split('T')[0] })
          }
          disableFuture
          minDate={twelveMonthsAgo}
          maxDate={today}
          slotProps={{ textField: { size: 'medium' } }}
        />
        */}

      <Autocomplete
        multiple
        options={attributeOptions}
        value={filters.attributes || []}
        onChange={(_, newVal) => setFilters({ ...filters, attributes: newVal })}
        renderInput={(params) => (
          <TextField {...params} label="Attributes" sx={{ minWidth: 200 }} />
        )}
      />

      <Autocomplete
        multiple
        options={metricOptions}
        value={filters.metrics || []}
        onChange={(_, newVal) => setFilters({ ...filters, metrics: newVal })}
        renderInput={(params) => (
          <TextField {...params} label="Metrics" sx={{ minWidth: 200 }} />
        )}
      />
    </Box>
    // </LocalizationProvider>
  );
};

export default FiltersPanel;
