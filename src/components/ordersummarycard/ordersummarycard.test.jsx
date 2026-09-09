import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderSummaryCard from './order summary card';

const mockProps = {
  label: 'My Order',
  items: [
    { name: 'Widget A', price: 10, quantity: 2 },
    { name: 'Widget B', price: 5, quantity: 1 }
  ],
  subtotal: 25,
  tax: 2.5,
  shipping: 5,
  total: 32.5,
  currency: 'USD'
};

const mockPConnect = {
  getConfigProps: () => mockProps,
  getValue: (prop) => mockProps[prop]
};

// Basic mock for @pega/cosmos-react-core to simplify tests in JS environment
jest.mock('@pega/cosmos-react-core', () => ({
  Card: ({ children }) => <div data-testid='card'>{children}</div>,
  CardHeader: ({ title }) => <div data-testid='card-header'>{title}</div>,
  CardContent: ({ children }) => <div data-testid='card-content'>{children}</div>,
  Typography: ({ children }) => <span>{children}</span>,
  Grid: ({ children }) => <div>{children}</div>,
  Divider: () => <hr />,
  Flex: ({ children }) => <div style={{ display: 'flex' }}>{children}</div>
}));

describe('OrderSummaryCard', () => {
  it('renders the order summary card with correct label', () => {
    render(<OrderSummaryCard getPConnect={() => mockPConnect} />);
    expect(screen.getByText('My Order')).toBeDefined();
  });

  it('renders list of items correctly', () => {
    render(<OrderSummaryCard getPConnect={() => mockPConnect} />);
    expect(screen.getByText(/Widget A/)).toBeDefined();
    expect(screen.getByText(/Widget B/)).toBeDefined();
    // Check price calculation 10 * 2 = 20 formatted
    expect(screen.getByText('$20.00')).toBeDefined();
    expect(screen.getByText('$5.00')).toBeDefined();
  });

  it('displays subtotal, tax, and shipping', () => {
    render(<OrderSummaryCard getPConnect={() => mockPConnect} />);
    expect(screen.getByText('$25.00')).toBeDefined();
    expect(screen.getByText('$2.50')).toBeDefined();
    expect(screen.getByText('$5.00')).toBeDefined();
  });

  it('displays the correct total', () => {
    render(<OrderSummaryCard getPConnect={() => mockPConnect} />);
    expect(screen.getByText('$32.50')).toBeDefined();
  });

  it('handles empty items gracefully', () => {
    const emptyPConnect = {
      getConfigProps: () => ({ ...mockProps, items: [] })
    };
    render(<OrderSummaryCard getPConnect={() => emptyPConnect} />);
    expect(screen.getByText('No items in order.')).toBeDefined();
  });
});