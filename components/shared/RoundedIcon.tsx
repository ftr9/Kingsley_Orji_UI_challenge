import { TouchableOpacity, View, Text } from 'react-native';

const RoundedIcon = ({
  children,
  name,
  onClick,
  isActive,
}: {
  children: React.ReactNode;
  name?: string;
  onClick?: () => void;
  isActive: boolean;
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onClick}
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 100,
          backgroundColor: isActive ? '#fcc419' : 'transparent',
          borderColor: isActive ? 'transparent' : '#ced4da',
        }}
      >
        {children}
      </TouchableOpacity>
      {name && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 5,
            color: '#868e96',
          }}
        >
          {name}
        </Text>
      )}
    </View>
  );
};

export default RoundedIcon;
