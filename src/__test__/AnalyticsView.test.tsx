import React from 'react';
import { render, screen } from '@testing-library/react';
import AnalyticsView from '../components/view/AnalyticsView';
import { Filters } from '../type/types';

// Mock all 4 chart components
jest.mock('../components/view/charts/SpendOverTime', () => () => <div data-testid="spend-over-time-chart" />);
jest.mock('../components/view/charts/SpendPerCat', () => () => <div data-testid="spend-per-cat-chart" />);
jest.mock('../components/view/charts/ChangeComparison', () => () => <div data-testid="change-comparison-chart" />);
jest.mock('../components/view/charts/StackedBarChart', () => () => <div data-testid="stacked-bar-chart" />);

describe('AnalyticsView - Chart Rendering Conditions', () => {
  const filters: Filters = {
    sector: 'Retail',
    category: 'Juice',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    metrics: ['mySpend'],
    attributes: ['country']
  };

  it('renders all four charts', () => {
    render(<AnalyticsView filters={filters} />);

    expect(screen.getByTestId('spend-over-time-chart')).toBeInTheDocument();
    expect(screen.getByTestId('spend-per-cat-chart')).toBeInTheDocument();
    expect(screen.getByTestId('change-comparison-chart')).toBeInTheDocument();
    expect(screen.getByTestId('stacked-bar-chart')).toBeInTheDocument();
  });
});
