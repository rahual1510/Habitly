import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useStyles } from './styles';

const CalendarView = ({ markedDates }: { markedDates: any }) => {
    const { styles } = useStyles();
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Habit Completion Calendar</Text>
            <Calendar
                markingType="multi-dot"
                markedDates={markedDates}
                theme={{
                    todayTextColor: 'blue',
                    arrowColor: 'black',
                    textDayFontWeight: 'bold',
                    dayTextColor: '#2B1A33',
                }}
            />
        </View>
    );
};

export default CalendarView;
