import {Button} from 'react-native';
import React from 'react';
import SwiftUIPaletteProxy from './ColorPaletteNative';
import {SafeAreaView} from 'react-native';
type Props = {};

const ColorPalette = ({}: Props) => {
  const [state, setState] = React.useState('Test' as string);
  const [stateInt, setStateInt] = React.useState(1);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SwiftUIPaletteProxy
        colorNameState={state}
        test={stateInt}
        style={{
          flex: 1,
        }}
      />
      <Button
        onPress={() => {
          setStateInt(prev => prev + 1);
          setState('Some React Native Text');
        }}
        title="Press me to change the state"
      />
    </SafeAreaView>
  );
};

export default ColorPalette;
