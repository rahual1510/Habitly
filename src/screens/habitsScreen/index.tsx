import React, { useContext } from 'react';
import { View, Text, Button, FlatList, SafeAreaView } from 'react-native';
import useHabitManager from './hooks/useHabitManager';
import AddHabitView from './components/addHabit';
import HabitItem from './components/habitItem';
import { useStyles } from './styles';
import { HabitContext } from '../../context/habitContext';

const HabitScreen = () => {
  const { habits } = useContext(HabitContext);
  const {
    callback: { handleSignOut, handleAddHabit, handleMarkCompletion, handleDeleteHabit, handleEditHabit },
  } = useHabitManager();
  const { styles, colors } = useStyles();

  const renderItem = ({ item }) => (
    <HabitItem item={item} handleMarkCompletion={handleMarkCompletion} handleEditHabit={handleEditHabit} handleDeleteHabit={handleDeleteHabit} />
  );

  const keyExtractor = (item) => item.id.toString();

  const listHeaderComponent = () => (
    <AddHabitView onAddHabit={handleAddHabit} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Habit Tracker</Text>
        <Button color={colors.button} title="Sign Out" onPress={handleSignOut} />
      </View>
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        data={habits}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.flatlistContentContainer}
      />
    </SafeAreaView>
  );
};

export default HabitScreen;
