import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TimeObj } from 'src/types/time';
import { styles } from 'styles/app-styles';
import { convertToMin } from 'util/time';

const Item = ({
  title,
  onPress,
  max
}: {
  title: TimeObj;
  onPress: () => void;
  max: TimeObj;
}) => {
  // convert duration in bed and sleep time to disable clicking beyond time actually spent in bed
  const maxSleepAmount = convertToMin(max);
  const sleepAmount = convertToMin(title);

  return (
    <View>
      <Pressable
        disabled={sleepAmount > maxSleepAmount}
        style={[
          styles.modalItemWrapper,
          {
            opacity: sleepAmount > maxSleepAmount ? 0.5 : 1
          }
        ]}
        onPress={() => {
          onPress();
        }}>
        <Text style={styles.modalItem}>
          {title.hour}:{title.minute}
        </Text>
      </Pressable>
    </View>
  );
};

const RenderItem = ({
  item,
  onPress,
  max
}: {
  item: TimeObj;
  onPress: () => void;
  max?: TimeObj;
}) => {
  return <Item title={item} onPress={onPress} max={max} />;
};

export default RenderItem;
