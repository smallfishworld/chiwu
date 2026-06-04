import React from 'react';
import { View, ViewStyle, StyleProp, Platform } from 'react-native';
import { useTheme, Theme } from '../../theme';

type SpacingKey = keyof Theme['spacing'];
type RadiiKey = keyof Theme['radii'];
type ShadowKey = keyof Theme['shadows'];

interface BoxProps {
  children?: React.ReactNode;
  bg?: string;
  p?: SpacingKey;
  px?: SpacingKey;
  py?: SpacingKey;
  pt?: SpacingKey;
  pb?: SpacingKey;
  pl?: SpacingKey;
  pr?: SpacingKey;
  m?: SpacingKey;
  mx?: SpacingKey;
  my?: SpacingKey;
  mt?: SpacingKey;
  mb?: SpacingKey;
  ml?: SpacingKey;
  mr?: SpacingKey;
  radius?: RadiiKey;
  shadow?: ShadowKey;
  border?: string;
  borderWidth?: number;
  flex?: number;
  row?: boolean;
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  gap?: SpacingKey;
  width?: number | string;
  height?: number | string;
  overflow?: ViewStyle['overflow'];
  position?: ViewStyle['position'];
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  pointerEvents?: ViewStyle['pointerEvents'];
}

export function Box({ children, style, ...props }: BoxProps) {
  const theme = useTheme();

  const viewStyle: ViewStyle = {};

  if (props.bg) viewStyle.backgroundColor = props.bg;
  if (props.flex !== undefined) viewStyle.flex = props.flex;
  if (props.row) viewStyle.flexDirection = 'row';
  if (props.justify) viewStyle.justifyContent = props.justify;
  if (props.align) viewStyle.alignItems = props.align;
  if (props.radius) viewStyle.borderRadius = theme.radii[props.radius];
  if (props.border) viewStyle.borderColor = props.border;
  if (props.borderWidth) viewStyle.borderWidth = props.borderWidth;
  if (props.width !== undefined) viewStyle.width = props.width as any;
  if (props.height !== undefined) viewStyle.height = props.height as any;
  if (props.overflow) viewStyle.overflow = props.overflow;
  if (props.position) viewStyle.position = props.position;
  if (props.top !== undefined) viewStyle.top = props.top;
  if (props.bottom !== undefined) viewStyle.bottom = props.bottom;
  if (props.left !== undefined) viewStyle.left = props.left;
  if (props.right !== undefined) viewStyle.right = props.right;
  if (props.pointerEvents) viewStyle.pointerEvents = props.pointerEvents;

  // Padding
  const p = props.p !== undefined ? theme.spacing[props.p] : undefined;
  if (props.px !== undefined || p !== undefined) {
    viewStyle.paddingHorizontal = props.px ? theme.spacing[props.px] : p;
  }
  if (props.py !== undefined || p !== undefined) {
    viewStyle.paddingVertical = props.py ? theme.spacing[props.py] : p;
  }
  if (props.pt !== undefined) viewStyle.paddingTop = theme.spacing[props.pt];
  if (props.pb !== undefined) viewStyle.paddingBottom = theme.spacing[props.pb];
  if (props.pl !== undefined) viewStyle.paddingLeft = theme.spacing[props.pl];
  if (props.pr !== undefined) viewStyle.paddingRight = theme.spacing[props.pr];

  // Margin
  const m = props.m !== undefined ? theme.spacing[props.m] : undefined;
  if (props.mx !== undefined || m !== undefined) {
    viewStyle.marginHorizontal = props.mx ? theme.spacing[props.mx] : m;
  }
  if (props.my !== undefined || m !== undefined) {
    viewStyle.marginVertical = props.my ? theme.spacing[props.my] : m;
  }
  if (props.mt !== undefined) viewStyle.marginTop = theme.spacing[props.mt];
  if (props.mb !== undefined) viewStyle.marginBottom = theme.spacing[props.mb];
  if (props.ml !== undefined) viewStyle.marginLeft = theme.spacing[props.ml];
  if (props.mr !== undefined) viewStyle.marginRight = theme.spacing[props.mr];

  // Gap
  if (props.gap) viewStyle.gap = theme.spacing[props.gap];

  // Shadow
  if (props.shadow) {
    const s = theme.shadows[props.shadow];
    Object.assign(viewStyle, Platform.OS === 'ios' ? s.ios : s.android);
  }

  return <View style={[viewStyle, style]}>{children}</View>;
}
