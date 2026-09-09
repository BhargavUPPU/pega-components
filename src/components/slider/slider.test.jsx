import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Slider from './slider';

const mockPConnect = {
  getActionsApi: () => ({
    updateFieldValue: jest.fn(),
  }),
  getStateProps: () => ({
    value: 'pySliderProperty',
  }),
  getConfigProps: () => ({}),
};

describe('Slider Component', () => {
  it('renders the label and initial value', () => {
    render(
      <Slider 
        getPConnect={() => mockPConnect} 
        label="Volume" 
        value={50} 
        min={0} 
        max={100} 
      />
    );

    expect(screen.getByText('Volume')).toBeTruthy();
    expect(screen.getByText('50')).toBeTruthy();
  });

  it('updates local state on change', () => {
    render(
      <Slider 
        getPConnect={() => mockPConnect} 
        label="Volume" 
        value={50} 
      />
    );

    const sliderInput = screen.getByRole('slider');
    fireEvent.change(sliderInput, { target: { value: '75' } });
    
    expect(screen.getByText('75')).toBeTruthy();
  });

  it('calls updateFieldValue on blur', () => {
    const updateMock = jest.fn();
    const customPConnect = {
      ...mockPConnect,
      getActionsApi: () => ({
        updateFieldValue: updateMock,
      }),
    };

    render(
      <Slider 
        getPConnect={() => customPConnect} 
        label="Volume" 
        value={50} 
      />
    );

    const sliderInput = screen.getByRole('slider');
    fireEvent.change(sliderInput, { target: { value: '80' } });
    fireEvent.blur(sliderInput);

    expect(updateMock).toHaveBeenCalledWith('pySliderProperty', '80');
  });

  it('renders in read-only mode', () => {
    render(
      <Slider 
        getPConnect={() => mockPConnect} 
        label="Volume" 
        value={42} 
        readOnly={true} 
      />
    );

    expect(screen.queryByRole('slider')).toBeNull();
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('displays validation messages', () => {
    const messages = ['Value is too high'];
    render(
      <Slider 
        getPConnect={() => mockPConnect} 
        label="Volume" 
        validatemessages={messages} 
      />
    );

    expect(screen.getByText('Value is too high')).toBeTruthy();
  });
});