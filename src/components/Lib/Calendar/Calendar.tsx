import {View} from 'react-native';
import React from 'react';
import SwiftUICalendarPicker from './CalendarNative';

type Props = {};

const Calendar = ({}: Props) => {
  const date = new Date('2023-01-02').toISOString().split('T')[0];
  return (
    <View className="flex-1">
      <SwiftUICalendarPicker
        style={{
          flex: 1,
        }}
        dateString={date}
        onDateChange={e => {
          console.log(e.nativeEvent);
        }}
      />
    </View>
  );
};

export default Calendar;
