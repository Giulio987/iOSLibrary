import {View, Text, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Glyphs from 'react-native-vector-icons/Glyphmaps/Entypo.json';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useStore} from 'tinybase/lib/ui-react';

type IconProps = keyof typeof Glyphs;
type RootStackProps = NativeStackNavigationProp<AppStackParamList, 'Home'>;

type Props = {
  name: keyof AppStackParamList;
  is_favourite?: boolean;
  rowId: string;
};

const Selector = ({name, is_favourite, rowId}: Props) => {
  const navigation = useNavigation<RootStackProps>();
  const store = useStore();

  const handleNavigate = useCallback(() => {
    navigation.navigate(name);
  }, [navigation, name]);

  const translateX = useSharedValue(0);
  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onChange(e => {
      'worklet';
      if (e.changeX < 0) {
        translateX.value = withTiming(-48);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);

  const updateFavourite = useCallback(() => {
    store?.setCell('components', rowId, 'is_favourite', !is_favourite);
  }, [store, rowId, is_favourite]);

  return (
    <View className={'relative flex-1 justify-center z-20 mt-4'}>
      <GestureDetector gesture={gesture}>
        <Animated.View className={'flex-1 z-10'} style={rnStyle}>
          <TouchableWithoutFeedback className="flex-1" onPress={handleNavigate}>
            <View className="container flex-row bg-white h-10 rounded-lg items-center justify-between px-2 text-center">
              <Text className="title">{name}</Text>
              <Icon name={'chevron-right' as IconProps} size={24} />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </GestureDetector>
      <View className="absolute flex-row right-0 h-full min-w-[32] items-center justify-center z-0">
        <Pressable onPress={updateFavourite}>
          <Icon
            name={'star' as IconProps}
            size={24}
            color={is_favourite ? 'gold' : 'black'}
          />
        </Pressable>
        {/*   <Icon name={'trash' as IconProps} size={24} /> */}
      </View>
    </View>
  );
};

export default Selector;
