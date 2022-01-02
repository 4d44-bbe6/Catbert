import { Appbar } from 'react-native-paper';

function AppBar({
  subtitle,
}) {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => {
        console.log('back');
      }}
      />
      <Appbar.Content
        subtitle={subtitle}
        title="Catbert"
      />
    </Appbar.Header>
  );
}

export default AppBar;
