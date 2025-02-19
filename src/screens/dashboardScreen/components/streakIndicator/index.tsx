import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useStyles } from './styles';

const StreakIndicator = ({ streakCount, badges }: { streakCount: number, badges: Array<number> }) => {
  const { styles } = useStyles();
  const showBadges = () => (
    badges.map((badge, index) => (
      <View key={index} style={styles.badgeView}>
        <Text key={index} style={styles.badgeText}>{badge}</Text>
      </View>
    ))
  );

  const badgesView = useMemo(() => {
    if (badges?.length) {
      return (
        <View>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgeContainer}>
            {showBadges()}
          </View>
        </View>
      );
    }
  }, [badges?.length]);
  return (
    <>
      {badgesView}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Weekly Streak</Text>
        <Text style={styles.streakText}>{streakCount} Days</Text>
      </View>
    </>
  );
};

export default StreakIndicator;


