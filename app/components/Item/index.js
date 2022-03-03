import { useState } from 'react';
import {
  View, Pressable, StyleSheet, Text,
} from 'react-native';
import {
  FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo,
} from '@expo/vector-icons';

import AddButton from '../elements/AddButton';
import { colors } from '../../styles';

function Item({
  item, status, icon, remove = false,
}) {
  const [showRemove, setShowRemove] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const removeScale = async (scaleId) => {
    setConfirmRemove(false);
    await remove(scaleId);
  };

  return (
    <View>
      <Pressable onLongPress={() => {
        setShowRemove(true);
      }}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            {icon.name === 'bowl'
              ? <MaterialCommunityIcons name={icon.name} size={24} color="black" />
              : <FontAwesome5 name={icon.name} size={24} />}

            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.text}>{`${item.name}`}</Text>
              <Text style={styles.text}>{status}</Text>
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
      <View style={styles.warning}>
        <Text style={styles.warning}>Weet je zeker dat het item wil verwijderen?</Text>
        <Pressable onPress={() => {
          removeScale(item._id);
        }}
        >
          <AddButton />
        </Pressable>
      </View>
      )}
    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

    backgroundColor: colors.primary,
    minWidth: '100%',

  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  text: {
    color: colors.textLight,
    fontSize: 14,
  },

  warning: {
    backgroundColor: colors.warning,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
