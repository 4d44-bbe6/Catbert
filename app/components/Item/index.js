import { View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { StyledText, StyledItem, StyledIcon } from '../../styles';

function Item({
  name, status, icon, remove = false,
}) {
  // const randomColor = () => {
  //   const colors = [
  //     'orange', 'green', 'red', 'blue',
  //   ];
  //   return colors[Math.floor(Math.random() * (colors.length - 1))];
  // };

  return (
    <StyledItem>
      <View>
        <StyledIcon>
          {icon.name === 'bowl'
            ? <MaterialCommunityIcons name={icon.name} size={24} color="black" />
            : <FontAwesome5 name={icon.name} size={24} />}
        </StyledIcon>
        <View>
          <StyledText>{`${name}`}</StyledText>
          <StyledText>{status}</StyledText>
        </View>
      </View>
      {remove
      && (
      <StyledIcon>
        <AntDesign name="minuscircle" size={24} />
      </StyledIcon>
      )}

    </StyledItem>
  );
}

export default Item;
