import React from 'react';
import { render } from '@testing-library/react';
import infocar from './index';
test('renders component', () => { render(<infocar label="infocar" />); });