import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

import { padding } from './helpers';

export const colors = {
  primary: '#145DA0',
  secondary: '#0C2D48',
  textLight: '#FFFFFF',
  textDark: '#19282F',
  warning: '#cc3300',
  white: '#FFFFFF',
};

export const theme = {
  ...DefaultTheme,
  ...colors,
};

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemContainer: {
    backgroundColor: colors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...padding(10, 20),
    marginBottom: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  warningContainer: {
    backgroundColor: colors.warning,
    display: 'flex',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    ...padding(2, 15),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.primary,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.textDark,
    marginBottom: 15,
  },
  title: {
    color: colors.textLight,
    fontSize: 16,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: 14,
  },
  warningTitle: {
    color: colors.textLight,
  },
  graphTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: colors.text,
  },
  icon: {
    marginTop: 5,
  },
});
