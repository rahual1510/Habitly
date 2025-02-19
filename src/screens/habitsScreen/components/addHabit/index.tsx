import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useStyles } from './styles';
import { HabitFrequency } from '../../../../constants';
import LoaderView from '../../../../utils/components/loaderView';
import { showLocalNotification } from '../../../../utils/helper';

interface AddHabitProps {
    onAddHabit: (habit: any) => Promise<any>;
}

const AddHabitView = ({ onAddHabit }: AddHabitProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [habitName, setHabitName] = useState<string>('');
    const [habitDescription, setHabitDescription] = useState<string>('');
    const [habitFrequency, setHabitFrequency] = useState<HabitFrequency>(HabitFrequency.DAILY);
    const [error, setError] = useState<string>('');
    const [expanded, setExpanded] = useState<boolean>(false); // Track open state

    const { styles } = useStyles();

    const height = useSharedValue(0);
    const opacity = useSharedValue(0);

    const toggleView = () => {
        if (!expanded) {
            height.value = withTiming(290, { duration: 300, easing: Easing.ease });
            opacity.value = withTiming(1, { duration: 200 });
        } else {
            height.value = withTiming(0, { duration: 300, easing: Easing.ease });
            opacity.value = withTiming(0, { duration: 150 });
        }
        setExpanded(!expanded);
        setError('');
    };

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: opacity.value,
        overflow: 'hidden',
    }));

    const handleAddHabit = async () => {
        setError('');
        if (!habitName.trim() || !habitDescription.trim()) {
            setError('Please fill in both the habit name and description.');
            return;
        }
        setLoading(true);
        let res = await onAddHabit({
            name: habitName,
            description: habitDescription,
            frequency: habitFrequency,
        });
        if (res) {
            showLocalNotification({
                title: 'Habit Added',
                message: `You have successfully added ${habitName}.`,
            });
            setHabitName('');
            setHabitDescription('');
            setHabitFrequency(HabitFrequency.DAILY);
            toggleView();
        } else {
            setError('Failed to add habit. Please try again.');
        }
        setLoading(false);
    };

    return (
        <View style={[styles.container]}>
            {!expanded && (
                <TouchableOpacity onPress={toggleView} style={styles.viewAddButton}>
                    <Text style={styles.addText}>+ Add Habit</Text>
                </TouchableOpacity>
            )}
            <Animated.View style={[animatedStyle]}>
                <Text style={styles.label}>Habit Name:</Text>
                <TextInput
                    value={habitName}
                    onChangeText={setHabitName}
                    placeholder="Enter habit name"
                    style={styles.input}
                />
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    value={habitDescription}
                    onChangeText={setHabitDescription}
                    placeholder="Enter habit description"
                    style={styles.input}
                />
                <Text style={styles.label}>Frequency:</Text>
                <View style={styles.frequencyContainer}>
                    <TouchableOpacity
                        style={[styles.frequencyButton, habitFrequency === HabitFrequency.DAILY && styles.selected]}
                        onPress={() => setHabitFrequency(HabitFrequency.DAILY)}
                    >
                        <Text style={[styles.frequencyText, habitFrequency === HabitFrequency.DAILY && styles.selectedText]}>
                            Daily
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.frequencyButton, habitFrequency === HabitFrequency.WEEKLY && styles.selected]}
                        onPress={() => setHabitFrequency(HabitFrequency.WEEKLY)}
                    >
                        <Text style={[styles.frequencyText, habitFrequency === HabitFrequency.WEEKLY && styles.selectedText]}>
                            Weekly
                        </Text>
                    </TouchableOpacity>
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={toggleView} disabled={loading}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddHabit} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add</Text>}
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {loading && <LoaderView />}
        </View>
    );
};

export default AddHabitView;
