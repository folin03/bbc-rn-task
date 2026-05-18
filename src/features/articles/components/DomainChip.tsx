import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { Domain } from '@articles/constants';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';
import { COLORS } from '@theme';

interface DomainChipProps {
  title: Domain;
}

export const DomainChip: FC<DomainChipProps> = ({ title }) => {
  const { selectedDomains, toggleDomain } = useArticleFiltersStore();

  const comLessTitle = title.replace('.com', '');
  const isSelectedDomain = selectedDomains.includes(title);

  return (
    <TouchableOpacity
      testID={`domain-chip-${title}`}
      accessibilityRole="tab"
      accessibilityLabel={comLessTitle}
      accessibilityHint={`Select or deselect ${comLessTitle} news`}
      accessibilityState={{ selected: isSelectedDomain }}
      accessible={true}
      onPress={() => toggleDomain(title)}
      style={[styles.container, isSelectedDomain && styles.selected]}
    >
      <Text style={[styles.text, isSelectedDomain && styles.textSelected]}>
        {comLessTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontWeight: '600',
  },
  textSelected: {
    color: COLORS.white,
  },
});
