import {ScrollView} from 'react-native';
import React from 'react';
import Selector from '../components/Selector';
import {useTable} from 'tinybase/lib/ui-react';

type Props = {};

const HomeScreen = ({}: Props) => {
  // NOTE BUILD AN APP WITH ALL NATIVE COMPONENTS IN SWIFTUI AND EXPORT IT TO REACT NATIVE
  // NOTE save favourite components with the TINYDB
  const components = Object.entries(useTable('components') as Object).map(
    ([key, value]) => {
      return {
        name: value.name,
        is_favourite: value.is_favourite,
        key: key,
      };
    },
  );

  return (
    <ScrollView className="px-4 my-4 space-y-4">
      {components.map(screen => (
        <Selector
          key={screen.name}
          name={screen.name}
          rowId={screen.key}
          is_favourite={screen.is_favourite}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
