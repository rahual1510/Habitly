import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CalendarView from './components/calendarView';
import StreakIndicator from './components/streakIndicator';
import CompletionStats from './components/completionStats';
import useDashboard from './hooks/useDashboard';
import { useStyles } from './styles';


const DashboardScreen = () => {
  const { styles } = useStyles();
  const { markedDates, streakCount, monthlyCompletion, badges } = useDashboard();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={styles.contentContainer}>
      <CalendarView markedDates={markedDates} />
      <StreakIndicator streakCount={streakCount} badges={badges} />
      <CompletionStats monthlyCompletion={monthlyCompletion} />
    </ScrollView>
  );
};

export default DashboardScreen;


