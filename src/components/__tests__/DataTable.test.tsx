import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '../DataTable';
import { StreamData } from '../../types';

const mockData: StreamData[] = [
  {
    songName: "Cruel Summer",
    artist: "Taylor Swift",
    dateStreamed: "2024-03-15T14:32:00Z",
    streamCount: 1,
    userId: "user_789"
  },
  {
    songName: "Vampire",
    artist: "Olivia Rodrigo",
    dateStreamed: "2024-03-15T14:30:00Z",
    streamCount: 2,
    userId: "user_456"
  }
];

describe('DataTable', () => {
  it('renders all columns correctly', () => {
    render(<DataTable data={mockData} />);

    expect(screen.getByText('Song Name')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('Date Streamed')).toBeInTheDocument();
    expect(screen.getByText('Stream Count')).toBeInTheDocument();
    expect(screen.getByText('User ID')).toBeInTheDocument();
  });

  it('displays all data rows', () => {
    render(<DataTable data={mockData} />);

    expect(screen.getByText('Cruel Summer')).toBeInTheDocument();
    expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
    expect(screen.getByText('user_789')).toBeInTheDocument();
    expect(screen.getByText('Vampire')).toBeInTheDocument();
    expect(screen.getByText('Olivia Rodrigo')).toBeInTheDocument();
  });

  it('sorts data when column header is clicked', () => {
    render(<DataTable data={mockData} />);
    
    // Click on Artist column header
    fireEvent.click(screen.getByText('Artist'));
    
    // Check if sorting is applied (Olivia should come before Taylor in ascending order)
    const artistCells = screen.getAllByRole('cell').filter(cell => 
      cell.textContent === 'Olivia Rodrigo' || cell.textContent === 'Taylor Swift'
    );
    
    expect(artistCells[0]).toHaveTextContent('Taylor Swift');
    expect(artistCells[1]).toHaveTextContent('Olivia Rodrigo');
  });

  it('reverses sort order when same column is clicked twice', () => {
    render(<DataTable data={mockData} />);
    
    // Click Artist column header twice
    const artistHeader = screen.getByText('Artist');
    fireEvent.click(artistHeader);
    fireEvent.click(artistHeader);
    
    // Check if sorting is reversed (Taylor should come before Olivia in descending order)
    const artistCells = screen.getAllByRole('cell').filter(cell => 
      cell.textContent === 'Olivia Rodrigo' || cell.textContent === 'Taylor Swift'
    );
    
    expect(artistCells[0]).toHaveTextContent('Olivia Rodrigo');
    expect(artistCells[1]).toHaveTextContent('Taylor Swift');
  });

  it('formats date correctly', () => {
    render(<DataTable data={mockData} />);
    
    // Note: The exact formatted string will depend on the user's locale
    const dateCell = screen.getByText(/2024, 8:02:00 PM/);
    expect(dateCell).toBeInTheDocument();
  });

  it('handles empty data array', () => {
    render(<DataTable data={[]} />);
    
    // Headers should still be visible
    expect(screen.getByText('Song Name')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    
    // No data rows should be present
    expect(screen.queryByText('Cruel Summer')).not.toBeInTheDocument();
  });
});