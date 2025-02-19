import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import HabitScreen from '../screens/habitsScreen';
import SCREEN_NAMES, { MODAL_NAMES } from './screenNames';
import { UserContext } from '../context/userContext';
import DashboardScreen from '../screens/dashboardScreen';
import EditHabit from '../screens/habitsScreen/Modal/editHabit';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './customTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.LOGIN} screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
    </Stack.Navigator>

  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.HABIT} screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name={SCREEN_NAMES.HABIT} component={HabitScreen} />
      <Stack.Screen name={MODAL_NAMES.EDIT_HABIT} component={EditHabit} options={{
        presentation: 'transparentModal',
        headerShown: false,
      }} />
    </Stack.Navigator>
  );
};

const LoggedInStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name={SCREEN_NAMES.HABIT_STACK} component={HomeStack} />
      <Tab.Screen name={SCREEN_NAMES.DASHBOARD} component={DashboardScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {

  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn === null) {
    return <></>;
  }
  return (
    <NavigationContainer  >
      {isLoggedIn ? <LoggedInStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Navigation;
