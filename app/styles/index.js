import { DefaultTheme } from '@react-navigation/native';

export const colors = {
  primary: '#145DA0',
  secondary: '#0C2D48',
  textLight: '#FFFFFF',
  textDark: '#19282F',
  warning: '#cc3300',
};

export const theme = {
  ...DefaultTheme,
  ...colors,
};
