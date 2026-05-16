import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SortByButton } from '@articles/components/SortByButton';

describe('SortByButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button title', () => {
    const { getByText } = render(
      <SortByButton title="Latest" active={false} onPress={mockOnPress} />,
    );

    expect(getByText('Latest')).toBeTruthy();
  });

  it('has correct accessibility role andcalls onPress when tapped', () => {
    const { getByTestId } = render(
      <SortByButton title="Latest" active={false} onPress={mockOnPress} />,
    );

    fireEvent.press(getByTestId('sort-by-button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility role label and hint', () => {
    const { getByTestId } = render(
      <SortByButton title="Latest" active={false} onPress={mockOnPress} />,
    );

    const fButton = getByTestId('sort-by-button');
    expect(fButton.props.accessibilityLabel).toBe('Latest articles');
    expect(fButton.props.accessibilityHint).toBe('Sort by Latest articles');
  });

  it('sets selected accessibility state when active', () => {
    const { getByTestId } = render(
      <SortByButton title="Latest" active={true} onPress={mockOnPress} />,
    );

    const button = getByTestId('sort-by-button');
    expect(button.props.accessibilityState.selected).toBe(true);
  });

  it('sets selected accessibility state to false when inactive', () => {
    const { getByTestId } = render(
      <SortByButton title="Latest" active={false} onPress={mockOnPress} />,
    );

    const button = getByTestId('sort-by-button');
    expect(button.props.accessibilityState.selected).toBe(false);
  });
});
