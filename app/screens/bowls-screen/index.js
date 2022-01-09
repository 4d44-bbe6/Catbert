/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  Text, View, ScrollView, Pressable, Button,
} from 'react-native';
import styled from 'styled-components/native';
import LineChart from '../../components/charts/LineChart';
import PieChart from '../../components/charts/PieChart';

import { getEntity } from '../../util';

function BowlsScreen() {
  const [scales, setScales] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cats, setCats] = useState([]);
  const [showScale, toggleScale] = useState(-1);
  const [showNewScale, toggleNewScale] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const dataScales = await getEntity('scales');
      setScales(dataScales);

      const dataLocations = await getEntity('locations');
      setLocations(dataLocations);

      const dataCats = await getEntity('cats');
      setCats(dataCats);
    }

    fetchData();
  }, []);
  const renderBowls = () => (
    <ScrollView>
      {scales.length > 0 && scales.map((scale, index) => (
        <View key={scale._id}>
          <View key={scale._id}>
            <Pressable onPress={() => (showScale === index ? toggleScale(-1) : toggleScale(index))}>
              <StyledHeader>{scale.name}</StyledHeader>
            </Pressable>
          </View>
          {index === showScale && (
          <>
            <LineChart scale={scale._id} />
            <PieChart scale={scale._id} />
          </>
          )}
        </View>

      ))}

      <Button title="Voer voerbak toe" onPress={() => toggleNewScale(!showNewScale)} />
      {showNewScale && (
        <View>
          <Text>Naam</Text>
          <Text>Voeg een  lokatie toe:</Text>
          {locations.length > 0 && locations.map((location) => (
            <View key={locations._id}>
              <Text>{location.name}</Text>
            </View>
          ))}
          <Text>Voeg één of meerdere katten toe:</Text>
        </View>
      )}

    </ScrollView>
  );

  return (
    <View>
      {renderBowls()}
    </View>
  );
}

export default BowlsScreen;

const StyledHeader = styled.Text`
  margin: 5px 15px;
  padding: 5px;
  border-radius: 5px;
  background-color: #cFcFcF;
`;
