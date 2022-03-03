import { useState } from 'react';
import {
  ScrollView, View, Pressable, Text, StyleSheet,
} from 'react-native';
import {
  FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo,
} from '@expo/vector-icons';

import LineChart from '../../../components/charts/LineChart';
import PieChart from '../../../components/charts/PieChart';

import { colors } from '../../../styles';

function BowlItem({
  scale, status, icon, remove = false, metrics,
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
              <Text style={styles.title}>{`${scale.name}`}</Text>
              <Text style={styles.subtitle}>{status}</Text>
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
          removeScale(scale._id);
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
            scale={scale._id}
            labels={metrics.day.map((scaleMetric) => `${scaleMetric.timestamp}:00`)}
            data={metrics.day.map((scaleMetric) => (scaleMetric.value))}
          />
        </View>
        )}
        {metrics?.week?.length && (
        <View>
          <Text style={styles.graphTitle}>Gewicht afgelopen 7 dagen.</Text>
          <LineChart
            scale={scale._id}
            labels={metrics.week.map((scaleMetric) => `${scaleMetric.timestamp}`)}
            data={metrics.week.map((scaleMetric) => (scaleMetric.value))}
          />
          <PieChart scale={scale._id} />
        </View>
        )}

      </>
      )}

    </ScrollView>
  );
}

export default BowlItem;

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    marginTop: 5,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  title: {
    color: colors.textLight,
    fontSize: 16,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: 14,
  },
  graphTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: colors.text,
  },
  warningContainer: {
    backgroundColor: colors.warning,
    padding: 10,

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warningTitle: {
    color: colors.textLight,
  },
});
