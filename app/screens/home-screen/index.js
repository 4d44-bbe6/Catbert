import { StyleSheet, Text, View } from 'react-native';

// @styles
const styles = StyleSheet.create({
  homeScreenContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

function HomeScreen() {
  return (
    <View style={styles.homeScreenContainer}>
      <Text>Laatste update: 13:38</Text>
      <Text>Ortiz: 12g gegeten</Text>
      <Text>Huidige voorraad: 1200g</Text>
    </View>
  );
}

export default HomeScreen;
