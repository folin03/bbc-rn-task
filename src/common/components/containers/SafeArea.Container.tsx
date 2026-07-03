import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeAreaContainerProps = ViewProps & {
  edges?: Edge[];
  fullFlex?: boolean; // if true, container will take full available space (flex: 1)
  // Internal use — computed from insets + edges, not passed by consumers
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
};

/**
 * A container that automatically applies safe area insets as padding based on the specified edges.\
 * Additional padding is added via direct props (paddingTop, paddingBottom, etc.) and will be combined with the safe area insets.
 */
const SafeAreaContainer: FC<SafeAreaContainerProps> = props => {
  const {
    edges,
    children,
    style,
    paddingTop = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0,
    fullFlex,
    ...rest
  } = props;
  const insets = useSafeAreaInsets();

  const _paddingTop = edges?.includes('top')
    ? insets.top + paddingTop
    : paddingTop;
  const _paddingBottom = edges?.includes('bottom')
    ? insets.bottom + paddingBottom
    : paddingBottom;
  const _paddingLeft = edges?.includes('left')
    ? insets.left + paddingLeft
    : paddingLeft;
  const _paddingRight = edges?.includes('right')
    ? insets.right + paddingRight
    : paddingRight;
  const flexStyle = fullFlex ? 1 : undefined;

  return (
    <View
      style={[
        {
          paddingTop: _paddingTop,
          paddingBottom: _paddingBottom,
          paddingLeft: _paddingLeft,
          paddingRight: _paddingRight,
          flex: flexStyle,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default SafeAreaContainer;
