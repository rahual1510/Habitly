import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { NOTIFICATION_CHANNELS } from '../constants';
const Notification = () => {

    useEffect(() => {
        requestUserPermission();
        getToken();
        createChannel();
    }, []);

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };

    const getToken = async () => {
        const token = await messaging().getToken();
        console.log('token', token);
    };

    const createChannel = () => {
        PushNotification.createChannel(
            NOTIFICATION_CHANNELS.CHANNEL_ONE
        );
    };
    return <></>;
};

export default Notification;

