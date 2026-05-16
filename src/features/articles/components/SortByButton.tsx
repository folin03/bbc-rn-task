import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '@theme';

interface SortByButtonProps {
  onPress: () => void;
  title: string;
  active: boolean;
}

// This component is responsible for rendering a single filter button used in the SortBySwitch component.
// It accepts an onPress function, a title for the button, and an active state to determine its styling.
// The button is designed to be accessible, with appropriate accessibility roles and states.
export const SortByButton: FC<SortByButtonProps> = props => {
  const { onPress, title, active } = props;
  return (
    <TouchableOpacity
      testID="sort-by-button"
      onPress={onPress}
      style={[styles.sortButton, active && styles.sortButtonActive]}
      accessibilityRole="tab"
      accessibilityState={{
        selected: active,
      }}
      accessibilityLabel={`${title} articles`}
      accessibilityHint={`Sort by ${title} articles`}
    >
      <Text
        style={[styles.sortButtonText, active && styles.sortButtonTextActive]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sortButton: {
    marginRight: 12,
    paddingBottom: 8,
  },
  sortButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  sortButtonText: {
    fontSize: 16,
    color: COLORS.muted,
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: COLORS.text,
  },
});
