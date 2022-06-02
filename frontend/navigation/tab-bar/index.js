import { IconButton, withTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  tabNavigationContainer: {
    borderTopColor: '#c4c4c4',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  tabNavigationButton: {
    flex: 1,
    flexDirection: 'row',
  },
  tabNavigationButtonIcon: {
    flex: 1,
  },
});

function TabBar({
  descriptors,
  iconSize,
  navigation,
  state,
}) {
  return (
    <View style={styles.tabNavigationContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const accessibilityStates = isFocused
          ? ['selected']
          : [];
        const onPressTab = () => {
          const event = navigation.emit({
            target: route.key,
            type: 'tabPress',
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate('Tabs', { screen: route.name });
          }
        };

        return (
          <TouchableOpacity
            accessibilityLabel={options.title}
            accessibilityRole="button"
            accessibilityStates={accessibilityStates}
            key={route.key}
            onPress={onPressTab}
            style={styles.tabNavigationButton}
          >
            <IconButton
              icon={options.icon}
              size={iconSize}
              style={styles.tabNavigationButtonIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default withTheme(TabBar);
