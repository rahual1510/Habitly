import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { HabitFrequency } from '../../../../constants';
import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import SCREEN_NAMES, { MODAL_NAMES } from '../../../../navigation/screenNames';
import moment from 'moment';
import { isDateInCurrentWeek } from '../../../../utils/helper';

interface HabitItemProps {
    item: any;
    handleMarkCompletion: (habitId: string) => void;
    handleEditHabit: (habitId: string, updatedHabit: any) => void;
    handleDeleteHabit: (habitId: string) => void;
}

const HabitItem = ({ item, handleMarkCompletion, handleEditHabit, handleDeleteHabit }: HabitItemProps) => {
    const { styles } = useStyles();
    const { navigate } = useNavigation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item?.name);
    const [editedDescription, setEditedDescription] = useState(item?.description);
    const [editedFrequency, setEditedFrequency] = useState(item?.frequency);

    const habitCompleted = useMemo(() => {
        if (item?.frequency === HabitFrequency.DAILY) {
            const today = moment().format('YYYY-MM-DD');
            return item?.completedDays?.includes(today);
        } else {
            if (item?.completedDays?.length) {
                return isDateInCurrentWeek(item?.completedDays[item?.completedDays.length - 1]);
            }
            return false;
        }
    }, [item?.completedDays?.length]);


    const onSaveChanges = () => {
        handleEditHabit(item?.id, {
            name: editedName,
            description: editedDescription,
            frequency: editedFrequency,
        });
        setIsEditing(false);
    };

    const onEditPress = () => {
        setIsEditing(true);
        setEditedName(item?.name);
        setEditedDescription(item?.description);
        setEditedFrequency(item?.frequency);
    };

    const onCancelEdit = () => {
        setIsEditing(false);
    };

    const showEditModal = () => {
        navigate(MODAL_NAMES.EDIT_HABIT, {
            habitCompleted,
            onEdit: () => onEditPress(),
            onDelete: () => handleDeleteHabit(item.id),
            onComplete: () => handleMarkCompletion(item.id),
        });
    };


    return (
        <TouchableOpacity activeOpacity={0.5} onPress={showEditModal} style={[styles.habitItem, habitCompleted && styles.completedView]}>
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder="Habit Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                        placeholder="Habit Description"
                    />
                    <View style={styles.frequencyContainer}>
                        <TouchableOpacity
                            style={[styles.frequencyButton, editedFrequency === HabitFrequency.DAILY && styles.selected]}
                            onPress={() => setEditedFrequency(HabitFrequency.DAILY)}
                        >
                            <Text style={[styles.frequencyText, editedFrequency === HabitFrequency.DAILY && styles.selectedText]}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.frequencyButton, editedFrequency === HabitFrequency.WEEKLY && styles.selected]}
                            onPress={() => setEditedFrequency(HabitFrequency.WEEKLY)}
                        >
                            <Text style={[styles.frequencyText, editedFrequency === HabitFrequency.WEEKLY && styles.selectedText]}>Weekly</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancelEdit}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSaveChanges}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.habitName}>{item.name}</Text>
                    <Text style={styles.habitDescription}>{item.description}</Text>
                    <Text style={styles.habitFrequency}>Frequency: {item.frequency}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

export default HabitItem;
