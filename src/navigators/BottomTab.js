import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/tabScreens/Home';
import Stores from '../screens/tabScreens/Stores';
import Account from '../screens/tabScreens/Account';
import {Icons} from '../themes/Icons';
import {Colors} from '../themes/Colors';
import normalize from '../utils/helpers/normalize';
import Personal from '../screens/tabScreens/Personal';
import DashBoard from '../screens/tabScreens/DashBoard';
// import BookingTopTab from './BookingTopTab';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  function Tabs({icons, title, focused}) {
    return (
      <>
        <Image
          source={icons}
          style={{
            height: normalize(20),
            width: normalize(20),
            resizeMode: 'contain',
            tintColor: focused ? Colors.black : Colors.inactive,
            marginBottom: normalize(1.5),
          }}
        />
        <Text
          style={{
            fontSize: normalize(10),
            color: focused ? Colors.black : Colors.inactive,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS == 'android' ? normalize(60) : normalize(75),
          borderTopWidth: normalize(1),
          borderTopColor: '#EFEFEF',
        },
        unmountOnBlur:false
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => (
            <>
              {Tabs({
                icons: Icons.jeveux,
                title: 'JEveux',
                focused,
              })}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Personal"
        component={Personal}
        options={{
          tabBarIcon: ({color, focused}) => (
            <>
              {Tabs({
                icons: Icons.personal,
                title: 'Personal',
                focused,
              })}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarIcon: ({color, focused}) => (
            <>
              {Tabs({
                icons: Icons.Home,
                title: 'Home',
                focused,
              })}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={Stores}
        options={{
          tabBarIcon: ({color, focused}) => (
            <>
              {Tabs({
                icons: Icons.Store,
                title: 'Store',
                focused,
              })}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color, focused}) => (
            <>
              {Tabs({
                icons: Icons.Account,
                title: 'Account',
                focused,
              })}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
