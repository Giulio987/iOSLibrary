import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import StoreProvider from './src/store/useStore';
import {AppStackParamList, screens} from './src/constants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<AppStackParamList>();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            {screens.map(props => (
              <Stack.Screen {...props} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default App;
