import React from 'react';
import UiButton from '../src/components/UiButton/UiButton';

import * as apiUtil from 'api/soFetch';
import { render } from '@testing-library/react-native';

test('renders correctly', () => {
  const mockFn = jest.fn();
  const fetchSpy = jest.spyOn(apiUtil, 'fetchData');
  fetchSpy.mockImplementation(() => {
    return Promise.resolve({ status: 'congrats' });
  });
  const tree = render(
    <UiButton
      onPress={mockFn}
      title="Calculate"
      disabled={false}
      accessibilityLabel="accessibilityLabel"
      testID="test"
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
