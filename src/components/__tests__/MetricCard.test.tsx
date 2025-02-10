import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../MetricCard';
import { Users } from 'lucide-react';

describe('MetricCard', () => {
  it('renders title and value correctly', () => {
    render(
      <MetricCard
        title="Total Users"
        value={1000000}
        icon={Users}
      />
    );

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('formats revenue values with currency symbol', () => {
    render(
      <MetricCard
        title="Revenue"
        value={5000000}
        icon={Users}
      />
    );

    expect(screen.getByText('$5,000,000')).toBeInTheDocument();
  });

  it('displays trend information when provided', () => {
    render(
      <MetricCard
        title="Total Users"
        value={1000000}
        icon={Users}
        trend={{ value: 5.2, isPositive: true }}
      />
    );

    expect(screen.getByText('+5.2%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('displays negative trend with correct styling', () => {
    render(
      <MetricCard
        title="Total Users"
        value={1000000}
        icon={Users}
        trend={{ value: 3.1, isPositive: false }}
      />
    );

    const trendElement = screen.getByText('-3.1%');
    expect(trendElement).toHaveClass('text-red-600');
  });

  it('handles string values correctly', () => {
    render(
      <MetricCard
        title="Top Artist"
        value="Taylor Swift"
        icon={Users}
      />
    );

    expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
  });

  it('renders icon component', () => {
    render(
      <MetricCard
        title="Total Users"
        value={1000000}
        icon={Users}
      />
    );

    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});