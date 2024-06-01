import React from 'react';
import { render } from '@testing-library/react';
import Home from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<Home />);
  expect(baseElement).toBeDefined();
});
