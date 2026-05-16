import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { COLORS } from '@theme';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';
import { DomainChip } from '../DomainChip';

jest.mock('@articles/store/useArticleFilters.Store');

const mockUseArticleFiltersStore = jest.mocked(useArticleFiltersStore);
const mockToggleDomain = jest.fn();

describe('DomainChip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cleaned title and selected state correctly', () => {
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: ['bbc.com'],
      toggleDomain: mockToggleDomain,
    });

    const { getByText, getByTestId } = render(<DomainChip title="bbc.com" />);

    expect(getByText('bbc')).toBeTruthy();
    const chip = getByTestId('domain-chip');
    expect(chip.props.accessibilityLabel).toBe('bbc');
    expect(chip.props.accessibilityHint).toBe('Select or deselect bbc news');
    expect(chip.props.accessibilityState.selected).toBe(true);
    expect(chip).toHaveStyle({ backgroundColor: COLORS.primary });

    expect(getByText('bbc')).toHaveStyle({ color: COLORS.white });
  });

  it('calls toggleDomain when pressed', () => {
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: [],
      toggleDomain: mockToggleDomain,
    });

    const { getByTestId } = render(<DomainChip title="google.com" />);

    const chip = getByTestId('domain-chip');
    fireEvent.press(chip);
    expect(mockToggleDomain).toHaveBeenCalledTimes(1);
    expect(mockToggleDomain).toHaveBeenCalledWith('google.com');
  });

  it('renders unselected state when the domain is not selected', () => {
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: ['apple.com'],
      toggleDomain: mockToggleDomain,
    });

    const { getByTestId } = render(<DomainChip title="google.com" />);

    const chip = getByTestId('domain-chip');
    expect(chip.props.accessibilityState.selected).toBe(false);
    expect(chip).not.toHaveStyle({ backgroundColor: COLORS.primary });
  });

  it('renders correct accessibility text for any domain', () => {
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: [],
      toggleDomain: mockToggleDomain,
    });

    const { getByTestId } = render(<DomainChip title="ign.com" />);

    const chip = getByTestId('domain-chip');
    expect(chip.props.accessibilityLabel).toBe('ign');
    expect(chip.props.accessibilityHint).toBe('Select or deselect ign news');
  });
});
