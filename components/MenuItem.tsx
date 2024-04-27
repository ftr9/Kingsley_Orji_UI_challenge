import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Imenu } from '@/types';
import { Ionicons } from '@expo/vector-icons';

interface IMenuItem extends Imenu {
  onClick: () => void;
}

const MenuItem = ({ name, description, image, onClick }: IMenuItem) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        style={{
          height: 135,
          width: 135,
        }}
        source={image}
        resizeMode="contain"
      />
      <View style={styles.left_container}>
        <View style={styles.text_container}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: '#868e96',
            }}
          >
            {description}
          </Text>
        </View>
        <Ionicons
          style={{
            marginLeft: 'auto',
          }}
          name="arrow-forward-circle-outline"
          size={28}
          color={'#868e96'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.5,
  },
  left_container: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 15,
  },
  text_container: {
    flex: 1,
    //backgroundColor: 'orange',
    justifyContent: 'center',
  },
});
