import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { NOTIFICATION_CHANNELS } from '../constants';
import { ImageStyle, StyleSheet, TextStyle, useColorScheme, ViewStyle } from 'react-native';
import { DARK_COLOR, LIGHT_COLOR } from '../styles/typography';
import moment from 'moment';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  _st: (colors: NamedStyles<T>) => T | NamedStyles<T>
): (() => {}) => {
  return () => {
    const scheme = useColorScheme();
    const colors = scheme === 'dark' ? DARK_COLOR : LIGHT_COLOR;
    return {
      styles: StyleSheet.create(_st({ colors })),
      colors,
    };
  };
};

export const storeData = async (key: string, value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error in saving data');
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error in geting data');
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error in removing data');
  }
};

export const showLocalNotification = ({
  title,
  message,
}: { title: string, message: string }) => {
  PushNotification.localNotification({
    channelId: NOTIFICATION_CHANNELS.CHANNEL_ONE.channelId,
    id: 0,
    title: title,
    message: message,
  });
};

export const isDateInCurrentWeek = (date: string) => {
  const startOfWeek = moment().startOf('isoWeek'); // Monday
  const endOfWeek = moment().endOf('isoWeek'); // Sunday
  return moment(date).isBetween(startOfWeek, endOfWeek, null, '[]'); // Inclusive
};

export const isCurrentMonth = (dateStr: string) => {
  const today = new Date();
  const date = new Date(dateStr);
  return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth();
};
