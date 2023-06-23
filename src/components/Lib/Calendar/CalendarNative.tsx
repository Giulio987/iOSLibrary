import {requireNativeComponent} from 'react-native';

const SwiftUICalendarPicker = requireNativeComponent(
  'CalendarPicker',
) as unknown as React.FC<{
  style?: React.CSSProperties;
  dateString?: string;
  onDateChange?: (e: any) => any;
}>;

export default SwiftUICalendarPicker;
