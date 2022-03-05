import { useState } from 'react';
import {
  ScrollView, View, Pressable, Text,
} from 'react-native';
import {
  FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo,
} from '@expo/vector-icons';

import LineChart from '../../../components/charts/LineChart';
import PieChart from '../../../components/charts/PieChart';
import { styles } from '../../../styles';

const COLORS = [
  'rgb(0, 0, 255)',
  'rgb(255, 255, 0)',
  'rgb(255, 0, 255)',
];

function BowlItem({
  item, status, icon, remove = false, metrics, cats,
}) {
  const [showRemove, setShowRemove] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [showGraphs, toggleGraphs] = useState(false);
  const removeScale = async (scaleId) => {
    setConfirmRemove(false);
    await remove(scaleId);
  };

  return (
    <ScrollView>
      <Pressable
        onLongPress={() => {
          setShowRemove(true);
        }}
        onPress={() => {
          if (showRemove) setShowRemove(!showRemove);

          toggleGraphs(!showGraphs);
        }}
      >
        <View style={styles.itemContainer}>
          <View style={styles.row}>
            <View style={styles.icon}>
              {icon.name === 'bowl'
                ? <MaterialCommunityIcons name={icon.name} size={24} color="black" />
                : <FontAwesome5 name={icon.name} size={24} />}
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{`${item.name}`}</Text>
              <Text style={styles.subtitle}>{status.toString()}</Text>
            </View>
          </View>
          {remove && showRemove
        && (
        <View>
          <Pressable onPress={() => setConfirmRemove(true)}>
            {!confirmRemove ? <AntDesign name="minuscircle" size={24} color="red" /> : <Pressable onPress={() => { setConfirmRemove(false); }}><Entypo name="cross" size={24} color="black" /></Pressable>}
          </Pressable>
        </View>
        )}
        </View>
      </Pressable>
      {confirmRemove && (
      <View style={[styles.row, styles.warningContainer]}>
        <Text style={styles.warningTitle}>Weet je zeker dat het item wil verwijderen?</Text>
        <Pressable onPress={() => {
          removeScale(item._id);
        }}
        >
          <AntDesign name="checkcircle" size={24} color="white" />
        </Pressable>
      </View>
      )}
      {showGraphs && (
      <>
        {metrics?.day?.length && (
        <View>
          <Text style={styles.graphTitle}>Gewicht afgelopen 24 uur.</Text>
          <LineChart
            scale={item._id}
            labels={metrics.day.map((scaleMetric) => `${scaleMetric.timestamp}:00`)}
            data={metrics.day.map((scaleMetric) => (scaleMetric.value))}
          />
        </View>
        )}
        {metrics?.week?.length && (
        <View>
          <Text style={styles.graphTitle}>Gewicht afgelopen 7 dagen.</Text>
          <LineChart
            scale={item._id}
            labels={metrics.week.map((scaleMetric) => `${scaleMetric.timestamp}`)}
            data={metrics.week.map((scaleMetric) => (scaleMetric.value))}

          />
          <Text style={styles.graphTitle}>Totaal gegeten per kat.</Text>
          <PieChart
            data={cats.map((cat, index) => ({
              id: cat._id,
              name: `${cat.name} - gram`,
              amount: parseInt(cat.amountEaten, 10),
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
              color: COLORS[index],
            }

            ))}
          />

        </View>
        )}

      </>
      )}

    </ScrollView>
  );
}

export default BowlItem;
