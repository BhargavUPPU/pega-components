import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCard from './index';

describe('PegaExtensionsImageCard', () => {
  const defaultProps = {
    title: 'Modern Architecture',
    description: 'Explore the latest in sustainable building design.',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    altText: 'Modern skyscraper',
    actionLabel: 'Learn More'
  };

  it('renders the title and description correctly', () => {
    render(<ImageCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the image with the correct src and alt attributes', () => {
    render(<ImageCard {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', defaultProps.imageSrc);
    expect(img).toHaveAttribute('alt', defaultProps.altText);
  });

  it('triggers the action callback when the button is clicked', () => {
    const mockAction = jest.fn();
    render(<ImageCard {...defaultProps} onActionClick={mockAction} />);
    
    const button = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(button);
    
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('does not render the button if actionLabel is missing', () => {
    const { actionLabel, ...propsWithoutButton } = defaultProps;
    render(<ImageCard {...propsWithoutButton} />);
    
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('does not render image section if imageSrc is missing', () => {
    const { imageSrc, ...propsWithoutImage } = defaultProps;
    render(<ImageCard {...propsWithoutImage} />);
    
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });
});