import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Production-ready Slider component for Pega Constellation DX
 * Uses standard Pega getPConnect patterns for state management and metadata.
 */
const Slider = (props) => {
  const { getPConnect, placeholder, label, helperText, validatemessages, readOnly, required, disabled, min = 0, max = 100, step = 1 } = props;
  const pConn = getPConnect();
  const actionsApi = pConn.getActionsApi();
  const propertyName = pConn.getStateProps().value;

  const [currentValue, setCurrentValue] = useState(props.value || min);

  useEffect(() => {
    setCurrentValue(props.value || min);
  }, [props.value, min]);

  const handleChange = (event) => {
    const val = event.target.value;
    setCurrentValue(val);
  };

  const handleBlur = (event) => {
    const val = event.target.value;
    actionsApi.updateFieldValue(propertyName, val);
  };

  if (readOnly) {
    return (
      <div className="psdk-slider-readonly">
        <span className="psdk-label">{label}</span>
        <div className="psdk-value">{currentValue}</div>
      </div>
    );
  }

  return (
    <div className="psdk-slider-container" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontWeight: '500' }}>
          {label}
          {required && <span style={{ color: 'red', marginLeft: '0.25rem' }}>*</span>}
        </label>
        <span style={{ fontWeight: 'bold' }}>{currentValue}</span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        title={placeholder}
        style={{
          width: '100%',
          cursor: disabled ? 'not-allowed' : 'pointer',
          marginTop: '0.5rem'
        }}
      />

      {helperText && <p style={{ fontSize: '0.875rem', color: '#666', margin: '4px 0' }}>{helperText}</p>}
      
      {validatemessages && validatemessages.length > 0 && (
        <div style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px' }}>
          {validatemessages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
};

Slider.defaultProps = {
  value: 0,
  placeholder: '',
  label: '',
  helperText: '',
  validatemessages: [],
  readOnly: false,
  required: false,
  disabled: false,
  min: 0,
  max: 100,
  step: 1
};

Slider.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  validatemessages: PropTypes.array,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

export default Slider;