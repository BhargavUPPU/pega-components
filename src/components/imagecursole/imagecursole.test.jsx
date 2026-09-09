import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ImageCarousel from './ImageCarousel';

const mockImages = [
  { url: 'test1.jpg', alt: 'Test 1', caption: 'Caption 1' },
  { url: 'test2.jpg', alt: 'Test 2', caption: 'Caption 2' }
];

// Mocking PConnect
const mockGetPConnect = () => ({
  getStateProps: () => ({}),
  getActionsApi: () => ({})
});

describe('ImageCarousel', () => {
  test('renders initial slide and caption', () => {
    render(<ImageCarousel getPConnect={mockGetPConnect} images={mockImages} />);
    
    expect(screen.getByAltText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Caption 1')).toBeInTheDocument();
  });

  test('navigates to next slide on button click', () => {
    render(<ImageCarousel getPConnect={mockGetPConnect} images={mockImages} />);
    
    const nextButton = screen.getByLabelText('Next Slide');
    fireEvent.click(nextButton);
    
    expect(screen.getByAltText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Caption 2')).toBeInTheDocument();
  });

  test('navigates to previous slide on button click', () => {
    render(<ImageCarousel getPConnect={mockGetPConnect} images={mockImages} />);
    
    const prevButton = screen.getByLabelText('Previous Slide');
    fireEvent.click(prevButton);
    
    // Should loop to the last image
    expect(screen.getByAltText('Test 2')).toBeInTheDocument();
  });

  test('navigates when clicking on dots', () => {
    render(<ImageCarousel getPConnect={mockGetPConnect} images={mockImages} />);
    
    const dot2 = screen.getByLabelText('Go to slide 2');
    fireEvent.click(dot2);
    
    expect(screen.getByAltText('Test 2')).toBeInTheDocument();
  });

  test('autoPlay progresses slides', () => {
    jest.useFakeTimers();
    render(<ImageCarousel getPConnect={mockGetPConnect} images={mockImages} autoPlay={true} autoPlayInterval={1000} />);
    
    expect(screen.getByAltText('Test 1')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByAltText('Test 2')).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('pauses autoPlay on mouse enter', () => {
    jest.useFakeTimers();
    render(<ImageCarousel getPConnect={mockGetPConnect} images={mockImages} autoPlay={true} autoPlayInterval={1000} />);
    
    const container = screen.getByAltText('Test 1').closest('div').parentElement.parentElement;
    fireEvent.mouseEnter(container);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Should still be on test 1
    expect(screen.getByAltText('Test 1')).toBeInTheDocument();
    jest.useRealTimers();
  });
});