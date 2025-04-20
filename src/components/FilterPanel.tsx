import React from "react";
import { Box, TextField, MenuItem, Autocomplete, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
  twelveMonthsAgo.setMonth(today.getMonth() - 12);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mt={2}
      >
        <Box display="flex" flexWrap="wrap" gap={1.5} alignItems="center">
          <TextField
            label="Sector"
            select
            value={filters.sector || ""}
            onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
            size="small"
            sx={{ width: 150 }}
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
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            size="small"
            sx={{ width: 150 }}
          >
            {categoryOptions.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Start Date"
            value={filters.startDate ? new Date(filters.startDate) : null}
            onChange={(date) =>
              setFilters({
                ...filters,
                startDate: date?.toISOString().split("T")[0],
              })
            }
            disableFuture
            minDate={twelveMonthsAgo}
            maxDate={today}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ width: 150 }} />
            )}
          />

          <DatePicker
            label="End Date"
            value={filters.endDate ? new Date(filters.endDate) : null}
            onChange={(date) =>
              setFilters({
                ...filters,
                endDate: date?.toISOString().split("T")[0],
              })
            }
            disableFuture
            minDate={twelveMonthsAgo}
            maxDate={today}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ width: 150 }} />
            )}
          />

          <Autocomplete
            multiple
            options={attributeOptions}
            value={filters.attributes || []}
            onChange={(_, newVal) =>
              setFilters({ ...filters, attributes: newVal })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Attributes"
                size="small"
                sx={{ width: 160 }}
              />
            )}
            disabled
          />

          <Autocomplete
            multiple
            options={metricOptions}
            value={filters.metrics || []}
            onChange={(_, newVal) =>
              setFilters({ ...filters, metrics: newVal })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Metrics"
                size="small"
                sx={{ width: 160 }}
              />
            )}
            disabled
          />
        </Box>

        <Button
          onClick={() => setFilters({})}
          variant="outlined"
          size="small"
          sx={{ height: 40 }}
        >
          Reset
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default FiltersPanel;
