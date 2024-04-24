import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import useActiveSelectedFoodStore from '@/store/ActiveSelectedFood.store';
import { MovementDirection } from '@/types';
import { Text } from 'react-native';

const getEnteringAnimationType = (direction: MovementDirection) => {
  if (direction === MovementDirection.UP) {
    return FadeInLeft.delay(400).duration(600);
  } else if (direction === MovementDirection.DOWN) {
    return FadeInRight.delay(400).duration(600);
  } else {
    return FadeInUp.delay(400).duration(600);
  }
};

const getExitingAnimationType = (direction: MovementDirection) => {
  if (direction === MovementDirection.UP) {
    return FadeOutRight.duration(600);
  } else if (direction === MovementDirection.DOWN) {
    return FadeOutLeft.duration(600);
  } else {
    return FadeOutDown.duration(600);
  }
};

const ActiveFoodIndicatorName = ({
  name,
  category,
  id,
}: {
  name: string;
  id: number;
  category: string;
}) => {
  const [activeId, direction] = useActiveSelectedFoodStore(store => [
    store.activeId,
    store.direction,
  ]);

  if (activeId !== id) {
    return null;
  }

  return (
    <>
      <Animated.View
        entering={getEnteringAnimationType(direction)}
        exiting={getExitingAnimationType(direction)}
      >
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
          {category}
        </Text>
      </Animated.View>
    </>
  );
};

export default ActiveFoodIndicatorName;
