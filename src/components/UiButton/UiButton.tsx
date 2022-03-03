import React from 'react';
import { Button } from 'react-native';

const UiButton: React.FC<{
  title: string;
  onPress: () => void;
  disabled: boolean;
  accessibilityLabel: string;
  testID: string;
}> = ({ onPress, title, disabled, accessibilityLabel, testID }) => {
  return (
    <>
      <Button
        onPress={onPress}
        title={title}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      />
    </>
  );
};

export default UiButton;
