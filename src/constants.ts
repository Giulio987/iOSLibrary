import Calendar from './components/Lib/Calendar/Calendar';
import ColorPalette from './components/Lib/ColorPalette/ColorPalette';

export type ScreenObject = {
  name: keyof AppStackParamList;
  component: React.ComponentType<any>;
  key?: string;
};

export type AppStackParamList = {
  Home: undefined;
  'Color Palette': undefined;
  Sliders: undefined;
  'Calendar Picker': undefined;
};

export const screens: ScreenObject[] = [
  {
    name: 'Color Palette',
    component: ColorPalette,
    key: 'colorPalette',
  },
  {
    name: 'Sliders',
    component: ColorPalette,
    key: 'sliders',
  },
  {
    name: 'Calendar Picker',
    component: Calendar,
    key: 'calendarPicker',
  },
];
