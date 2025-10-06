/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../Screens/Home/Main';
import Location from '../Screens/Home/Location';
import Scanner from '../Screens/Home/Scanner';
import Profile from '../Screens/Auth_Screen/Profile';

import CustomTabBar from './CustomTabBar';
import Filter from '../Screens/Home/Filter';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="Scanner" component={Scanner} />
      <Tab.Screen name="filter" component={Filter} />
      <Tab.Screen name="Profile" component={Profile}  />
    </Tab.Navigator>
  );
};

export default BottomTabs;
