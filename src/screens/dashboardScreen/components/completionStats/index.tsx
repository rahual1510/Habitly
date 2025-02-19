import React from 'react';
import { View, Text } from 'react-native';
import { useStyles } from './styles';

const CompletionStats = ({ monthlyCompletion }: { monthlyCompletion: number }) => {
    const { styles } = useStyles();
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Monthly Completion</Text>
            <Text style={styles.completionText}>{monthlyCompletion} Habits</Text>
        </View>
    );
};

export default CompletionStats;


