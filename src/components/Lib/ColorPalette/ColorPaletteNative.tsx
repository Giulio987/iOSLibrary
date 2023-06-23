import {requireNativeComponent} from 'react-native';

const SwiftUIPaletteProxy = requireNativeComponent(
  'ColorPalette',
) as unknown as React.FC<{
  style?: React.CSSProperties;
  colorNameState?: string;
  test?: number;
}>;

export default SwiftUIPaletteProxy;
