/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import UserProvider from './src/context/userContext';
import Notification from './src/services/notification';
import { HabitProvider } from './src/context/habitContext';


function App(): React.JSX.Element {
  return (
    <UserProvider>
      <HabitProvider>
        <Notification />
        <SafeAreaView style={styles.fullFlex}>
          <Navigation />
        </SafeAreaView>
      </HabitProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
});

export default App;
