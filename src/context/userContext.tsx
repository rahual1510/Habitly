import { createContext, useEffect } from 'react';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getData, removeData, storeData } from '../utils/helper';
import { ASYNC_STORAGE_KEYS } from '../constants';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);


  const checkLoginStatus = async () => {
    const data = await getData(ASYNC_STORAGE_KEYS.USER_DATA);
    if (data) {
      setIsLoggedIn(true);
      setUserData(data);
    } else {
      setIsLoggedIn(false);
    }
  };

  const login = async (user) => {
    setUserData(user);
    setIsLoggedIn(true);
    await storeData(ASYNC_STORAGE_KEYS.USER_DATA, user);
  };

  const logout = async () => {
    setUserData(null);
    setIsLoggedIn(false);
    await auth().signOut();
    await removeData(ASYNC_STORAGE_KEYS.USER_DATA);
  };


  const value = {
    isLoggedIn,
    userData,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
