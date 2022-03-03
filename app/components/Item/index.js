import { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import {
  FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo,
} from '@expo/vector-icons';

import AddButton from '../elements/AddButton';
import { styles } from '../../styles';

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
      <Pressable onLongPress={() => { setShowRemove(true); }}>
        <View style={styles.itemContainer}>
          <View style={styles.row}>
            {icon.name === 'bowl'
              ? <MaterialCommunityIcons name={icon.name} size={24} color="black" />
              : <FontAwesome5 name={icon.name} size={24} />}
            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.title}>{`${item.name}`}</Text>
              <Text style={styles.subtitle}>{status}</Text>
            </View>
          </View>
          {remove && showRemove && (
          <View>
            <Pressable onPress={() => setConfirmRemove(true)}>
              {!confirmRemove ? <AntDesign name="minuscircle" size={24} color="red" /> : <Pressable onPress={() => { setConfirmRemove(false); }}><Entypo name="cross" size={24} color="black" /></Pressable>}
            </Pressable>
          </View>
          )}
        </View>
      </Pressable>
      {confirmRemove && (
      <View style={styles.warningContainer}>
        <Text style={styles.warningTitle}>Weet je zeker dat het item wil verwijderen?</Text>
        <Pressable onPress={() => { removeScale(item._id); }}>
          <AddButton />
        </Pressable>
      </View>
      )}
    </View>
  );
}

export default Item;
