import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanel from '../components/FilterPanel';
import { Filters } from '../type/types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

describe('FilterPanel - Filter Functionality', () => {
  const setFilters = jest.fn();
  const initialFilters: Filters = {};

  const renderWithDateProvider = () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FilterPanel filters={initialFilters} setFilters={setFilters} />
      </LocalizationProvider>
    );
    setFilters.mockClear();
  };

  beforeEach(() => {
    renderWithDateProvider();
  });

  it('renders all filter inputs', () => {
    expect(screen.getByLabelText(/sector/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/group by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/metrics/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('updates sector filter when value is changed', async () => {
    const combo = screen.getByLabelText(/sector/i);
    await userEvent.click(combo);
    const listbox = await screen.findByRole('listbox');
    const option = within(listbox).getByText('Retail');
    await userEvent.click(option);

    expect(setFilters).toHaveBeenCalledWith(expect.objectContaining({ sector: 'Retail' }));
  });

  it('updates category filter when value is changed', async () => {
    const combo = screen.getByLabelText(/category/i);
    await userEvent.click(combo);
    const listbox = await screen.findByRole('listbox');
    const option = within(listbox).getByText('Juice');
    await userEvent.click(option);

    expect(setFilters).toHaveBeenCalledWith(expect.objectContaining({ category: 'Juice' }));
  });

  it('updates group by attributes when selected', async () => {
    const input = screen.getByLabelText(/group by/i);
    await userEvent.click(input);
    await userEvent.type(input, 'country');
    const option = await screen.findByText('country');
    await userEvent.click(option);

    expect(setFilters).toHaveBeenCalledWith(expect.objectContaining({
      attributes: expect.arrayContaining(['country']),
    }));
  });

  it('updates metrics when selected', async () => {
    const input = screen.getByLabelText(/metrics/i);
    await userEvent.click(input);
    await userEvent.type(input, 'mySpend');
    const option = await screen.findByText('mySpend');
    await userEvent.click(option);

    expect(setFilters).toHaveBeenCalledWith(expect.objectContaining({
      metrics: expect.arrayContaining(['mySpend']),
    }));
  });

  it('resets filters when reset button is clicked', async () => {
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(setFilters).toHaveBeenCalledWith({});
  });
});
