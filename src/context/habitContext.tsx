import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { COLLECTION_NAME } from '../constants';
import { UserContext } from './userContext';
import moment from 'moment';
import { showLocalNotification } from '../utils/helper';

export const HabitContext = createContext({});

export const HabitProvider = ({ children }) => {
    const { userData } = useContext(UserContext);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (!userData) { return; }

        const habitsRef = firestore()
            .collection(COLLECTION_NAME.HABITS)
            .where('userId', '==', userData.uid);

        const unsubscribe = habitsRef.onSnapshot((snapshot) => {
            const fetchedHabits = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHabits(fetchedHabits);
        });

        return () => unsubscribe();
    }, [userData]);

    const addHabit = async (habit) => {
        if (!userData) { return; }
        try {
            const res = await firestore().collection(COLLECTION_NAME.HABITS).add({
                ...habit,
                userId: userData.uid,
                createdAt: firestore.FieldValue.serverTimestamp(),
                completedDays: [],
                weeklyCompletion: [],
                streakCount: 0,
                lastCompletedDate: null,
            });
            return res;
        } catch (error) {
            console.error('Error adding habit:', error);
            return null;
        }
    };

    const markCompletion = async (habitId) => {
        const today = moment().format('YYYY-MM-DD');
        const todayWeek = moment().format('YYYY-[W]WW');
        const todayDay = moment().format('ddd');
        const habitRef = firestore().collection(COLLECTION_NAME.HABITS).doc(habitId);

        try {
            const habitDoc = await habitRef.get();
            if (habitDoc.exists) {
                const data = habitDoc.data();
                let { completedDays, weeklyCompletion, streakCount, lastCompletedDate } = data ?? {};

                if (!completedDays.includes(today)) {
                    completedDays.push(today);
                }

                let weekEntry = weeklyCompletion?.find(entry => entry.week === todayWeek);
                if (weekEntry) {
                    if (!weekEntry.days.includes(todayDay)) {
                        weekEntry.days.push(todayDay);
                    }
                } else {
                    weeklyCompletion.push({ week: todayWeek, days: [todayDay] });
                }

                if (lastCompletedDate) {
                    const yesterday = moment(lastCompletedDate).add(1, 'days').format('YYYY-MM-DD');
                    streakCount = (yesterday === today) ? streakCount + 1 : 1;
                } else {
                    streakCount = 1;
                }

                await habitRef.update({
                    completedDays,
                    weeklyCompletion,
                    streakCount,
                    lastCompletedDate: today,
                });
                if (streakCount >= 7) {
                    showLocalNotification({
                        title: 'Congrats',
                        message: '7 day streak completed today!',
                    });
                }
            }
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };

    const editHabit = async (habitId, updatedData) => {
        await firestore().collection(COLLECTION_NAME.HABITS).doc(habitId).update(updatedData);
    };

    const deleteHabit = async (habitId) => {
        await firestore().collection(COLLECTION_NAME.HABITS).doc(habitId).delete();
    };

    return (
        <HabitContext.Provider value={{ habits, addHabit, markCompletion, editHabit, deleteHabit }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabit = () => useContext(HabitContext);
