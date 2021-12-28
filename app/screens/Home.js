import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import BowlsScreen from './Bowls';

function HomeScreen({ data }) {
  return (
    <SafeAreaView>
      <BowlsScreen data={data} />
    </SafeAreaView>
  );
}

export default HomeScreen;

HomeScreen.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};
