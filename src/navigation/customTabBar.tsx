import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { makeStyles } from '../utils/helper';

const CustomTabBar = ({ state, navigation }) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { styles } = useStyles();

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    if (isKeyboardVisible) { return null; }

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={route.name}
                        onPress={() => navigation.navigate(route.name)}
                        style={[styles.tabItem, isFocused && styles.activeTab]}
                    >
                        <Text style={styles.tabText}>
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;

const useStyles = makeStyles(({ colors }) => {
    return {
        tabBar: {
            flexDirection: 'row',
            height: 60,
            backgroundColor: colors.primary,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: '#DDD',
            paddingHorizontal: 10,
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
        },
        tabText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.buttonText,
        },
        activeTab: {
            backgroundColor: colors.secondary,
            borderRadius: 10,
            paddingVertical: 12,
        },
    };
});
