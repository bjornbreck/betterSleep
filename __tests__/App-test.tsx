/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/Index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

it('renders correctly', () => {
  act(() => {
    renderer.create(<App />);
  });
});
