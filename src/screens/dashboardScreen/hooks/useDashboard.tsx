import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/userContext';
import firestore from '@react-native-firebase/firestore';
import { COLLECTION_NAME } from '../../../constants';
import { LIGHT_COLOR } from '../../../styles/typography';
import { isCurrentMonth, isDateInCurrentWeek } from '../../../utils/helper';

const useDashboard = () => {
    const { userData } = useContext(UserContext);
    const [markedDates, setMarkedDates] = useState({});
    const [streakCount, setStreakCount] = useState(0);
    const [monthlyCompletion, setMonthlyCompletion] = useState(0);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        if (!userData) { return; }
        fetchHabitData();
    }, [userData]);

    const fetchHabitData = async () => {
        const habitsSnapshot = await firestore()
            .collection(COLLECTION_NAME.HABITS)
            .where('userId', '==', userData.uid)
            .get();

        let tempMarkedDates = {};
        let tempStreakCount = 0;
        let tempMonthlyCompletion = 0;
        let badgesData = [];

        habitsSnapshot.forEach((doc) => {
            const habit = doc.data();
            const habitId = doc.id;
            const completedDays = habit.completedDays || [];
            const currentStreak = habit.streakCount || 0; // Fetch streak count from Firestore

            completedDays.forEach((day) => {
                if (!tempMarkedDates[day]) {
                    tempMarkedDates[day] = { dots: [] };
                }
                tempMarkedDates[day].dots.push({ key: habitId, color: habit.color || LIGHT_COLOR.primary });

                if (isDateInCurrentWeek(day)) { tempStreakCount++; }
                if (isCurrentMonth(day)) { tempMonthlyCompletion++; }
            });

            if (currentStreak >= 7) {
                if (!badgesData.includes(currentStreak)) {
                    badgesData.push(currentStreak);
                }
            }
        });

        setMarkedDates(tempMarkedDates);
        setStreakCount(tempStreakCount);
        setMonthlyCompletion(tempMonthlyCompletion);
        setBadges(badgesData);
    };

    return {
        markedDates,
        streakCount,
        monthlyCompletion,
        badges,
    };
};

export default useDashboard;
