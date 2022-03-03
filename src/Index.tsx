import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  ActivityIndicator
} from 'react-native';

// Types
import { TimeObj } from 'types/time';
// Utils
import { hourCounter, convertToMin } from 'util/time';
// Services
import { fetchData } from 'api/soFetch';
// Constants
import { HIG_BEALTH_URL } from 'const/constants';
// Components
import UiButton from 'components/UiButton/UiButton';
import RenderItem from 'components/Item/Item';
// Styles
import { styles } from 'styles/app-styles';

const Index = () => {
  const [modalDurationVisible, setModalDurationVisible] =
    useState<boolean>(false);
  const [modalAsleepVisible, setModalAsleepVisible] = useState<boolean>(false);
  const [modalSubmitResponse, setModalSubmitResponse] =
    useState<boolean>(false);
  const [durationInBed, setDurationInBed] = useState<TimeObj>(undefined);
  const [durationAsleep, setDurationAsleep] = useState<TimeObj>(undefined);
  const [timeItems, setTimeItems] = useState<Array<TimeObj>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<String>('');
  const [sleepScore, setSleepScore] = useState<String>('');

  useEffect(() => {
    const newHourCounter = hourCounter({ total: 24 });
    setTimeItems(newHourCounter);
  }, []);

  useEffect(() => {
    submitResponse.length >= 1
      ? setModalSubmitResponse(true)
      : setModalSubmitResponse(false);
  }, [submitResponse]);

  const handleSubmit = () => {
    setIsLoading(true);
    const calculateScore =
      100 * (convertToMin(durationAsleep) / convertToMin(durationInBed));
    setSleepScore(calculateScore.toFixed(2));

    fetchData({
      url: HIG_BEALTH_URL,
      settings: {
        method: 'POST',
        body: JSON.stringify({ score: calculateScore })
      }
    })
      .then(response => {
        setSubmitResponse(response.status);
        setDurationInBed(undefined);
        setDurationAsleep(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView>
      {/* BED DURATION SECTION */}
      <View>
        <View style={styles.selectButtonWrapper}>
          <Pressable
            onPress={() => setModalDurationVisible(true)}
            accessibilityLabel="Duration in bed button">
            <Text style={styles.selectButton}>
              Duration in Bed:
              {durationInBed && (
                <Text>
                  {' '}
                  {durationInBed?.hour}:{durationInBed?.minute}hrs
                </Text>
              )}
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDurationVisible}>
          <View style={styles.bottomView}>
            <View style={styles.modalHeader}>
              <Text>Duration in Bed</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalDurationVisible(!modalDurationVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <FlatList
                style={styles.modalListWrapper}
                data={timeItems}
                renderItem={timeItem => {
                  return (
                    <RenderItem
                      item={timeItem.item}
                      onPress={() => setDurationInBed(timeItem.item)}
                    />
                  );
                }}
                keyExtractor={item => `${item.hour}.${item.minute}`}
              />
            </View>
          </View>
        </Modal>
      </View>
      {/* SLEEP DURATION SECTION */}
      <View>
        <View style={styles.selectButtonWrapper}>
          <Pressable
            onPress={() => setModalAsleepVisible(true)}
            accessibilityLabel="Duration asleep button">
            <Text style={styles.selectButton}>
              Duration Asleep:{' '}
              {durationAsleep && (
                <Text>
                  {' '}
                  {durationAsleep?.hour}:{durationAsleep?.minute}hrs
                </Text>
              )}
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAsleepVisible}>
          <View style={styles.bottomView}>
            <View style={styles.modalHeader}>
              <Text>Duration Asleep</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalAsleepVisible(!modalAsleepVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <FlatList
                style={styles.modalListWrapper}
                data={timeItems}
                renderItem={timeItem => {
                  return (
                    <RenderItem
                      item={timeItem.item}
                      onPress={() => setDurationAsleep(timeItem.item)}
                      max={durationInBed}
                    />
                  );
                }}
                keyExtractor={item => `${item.hour}.${item.minute}`}
              />
            </View>
          </View>
        </Modal>
      </View>
      {/* submit modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSubmitResponse}>
        <View style={styles.bottomView}>
          <View style={styles.modalHeader}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setSubmitResponse('');
                setSleepScore('');
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalView}>
            {submitResponse.length >= 1 && (
              <>
                <Text>{submitResponse}</Text>
                <Text>Score: {sleepScore}%</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
      <UiButton
        onPress={handleSubmit}
        title="Calculate"
        disabled={isLoading || !durationAsleep || !durationInBed}
        accessibilityLabel="Calculate time form button"
        testID="submit-form"
      />
    </SafeAreaView>
  );
};

export default Index;
