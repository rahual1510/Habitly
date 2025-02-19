import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import SCREEN_NAMES from '../../../navigation/screenNames';
import { Keyboard } from 'react-native';
import { HabitContext } from '../../../context/habitContext';
import { UserContext } from '../../../context/userContext';

const useHabitManager = () => {
    const navigation = useNavigation();
    const { logout } = useContext(UserContext);
    const { addHabit, editHabit, deleteHabit, markCompletion } = useContext(HabitContext);

    const handleSignOut = () => {
        logout();
        navigation.navigate(SCREEN_NAMES.LOGIN);
    };

    const handleAddHabit = async (data) => {
        Keyboard.dismiss();
        return await addHabit(data);
    };

    const handleMarkCompletion = (habitId) => {
        markCompletion(habitId);
    };

    const handleDeleteHabit = (habitId) => {
        deleteHabit(habitId);
    };

    const handleEditHabit = (habitId, data) => {
        editHabit(habitId, data);
    };

    return {
        callback: {
            handleSignOut,
            handleAddHabit,
            handleMarkCompletion,
            handleDeleteHabit,
            handleEditHabit,
        },
    };
};

export default useHabitManager;
