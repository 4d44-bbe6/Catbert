import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    marginRight: '5%',

  },
});

function RemoveButton() {
  return (
    <View style={styles.container}>
      <AntDesign name="minuscircle" size={24} color="white" />
    </View>

  );
}

export default RemoveButton;
