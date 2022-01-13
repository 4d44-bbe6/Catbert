import { View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { StyledText, StyledItem, StyledIcon } from '../../styles';

function Item({ name, status, icon }) {
  const randomColor = () => {
    const colors = [
      'orange', 'green', 'red', 'blue',
    ];
    return colors[Math.floor(Math.random() * (colors.length - 1))];
  };

  return (
    <StyledItem>
      <StyledIcon>
        {icon.name === 'bowl'
          ? <MaterialCommunityIcons name={icon.name} size={24} color={randomColor()} />
          : <FontAwesome5 name={icon.name} size={24} color={randomColor()} />}
      </StyledIcon>
      <View>
        <StyledText>{`${name}:`}</StyledText>
        <StyledText>{status}</StyledText>
      </View>
    </StyledItem>
  );
}

export default Item;
