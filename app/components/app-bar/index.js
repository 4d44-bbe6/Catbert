import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
});

function AppBar() {
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Content
        title="Catbert"
      />
    </Appbar.Header>

  );
}

export default AppBar;
