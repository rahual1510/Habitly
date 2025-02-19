import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { makeStyles } from '../helper';

const LoaderView = () => {
    const { styles, colors } = useStyles();
    console.log('s', styles);
    return (
        <View style={styles.container}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    );
};

export default LoaderView;

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
    };
});
