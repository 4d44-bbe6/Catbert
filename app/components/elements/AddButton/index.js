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

function AddButton() {
  return (
    <View style={styles.container}>
      <AntDesign name="pluscircle" size={24} color="green" style={{ paddingBottom: '5%' }} />
    </View>

  );
}

export default AddButton;
