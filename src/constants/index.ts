export const ASYNC_STORAGE_KEYS = {
    USER_DATA: 'userData',
};

export const COLLECTION_NAME = {
    HABITS: 'habits',
};

export const NOTIFICATION_CHANNELS = {
    CHANNEL_ONE: {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
};

export enum HabitFrequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
}

