import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import Upcoming from '../screens/main/Booking/main/Upcoming';
import Previous from '../screens/main/Booking/main/Previous';
import Ongoing from '../screens/main/Booking/main/Ongoing';
import {Icons} from '../themes/Icons';
import normalize from '../utils/helpers/normalize';
import {Colors} from '../themes/Colors';
import Header from '../components/Header';
import {Fonts} from '../themes/Fonts';
import {useSelector} from 'react-redux';
const Tab = createMaterialTopTabNavigator();

const BookingTopTab = () => {
  const navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer);

  function TabHeader({title, focused}) {
    return (
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: focused ? Fonts.Poppins_Medium : Fonts.Poppins_Regular,
            fontSize: normalize(14),
            color:
              focused && title == 'Ongoing'
                ? 'white'
                : focused
                ? Colors.black
                : AuthReducer.initialTab
                ? '#E3E3E3'
                : '#A2A2A2',
            marginLeft: normalize(-5),
          }}>
          {title}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '100%',
          backgroundColor: AuthReducer.initialTab ? '#5E17EB' : 'white',
          height: normalize(100),
          position: 'absolute',
        }}
      />
      <StatusBar
        backgroundColor={AuthReducer.initialTab ? '#5E17EB' : 'white'}
        barStyle={AuthReducer.initialTab ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          paddingHorizontal: normalize(16),
          backgroundColor: AuthReducer.initialTab ? '#5E17EB' : 'white',
        }}>
        <Header
          onPress={() => navigation.navigate('BottomTab')}
          title={'Bookings'}
          goBack={false}
          tintColor={AuthReducer.initialTab ? 'white' : undefined}
          textColor={AuthReducer.initialTab ? 'white' : 'black'}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {
            backgroundColor: AuthReducer.initialTab ? '#5E17EB' : 'white',
            borderBottomColor: Colors.white,
            borderBottomWidth: AuthReducer.initialTab ? normalize(1) : 0,
          },
        }}>
        <Tab.Screen
          name="Upcoming"
          component={Upcoming}
          options={{
            title: ({focused}) => (
              <>
                {TabHeader({
                  title: 'Upcoming',
                  focused,
                })}
              </>
            ),
            tabBarIndicatorStyle: {
              borderBottomColor: 'yellow',
              borderBottomWidth: normalize(3),
              borderRadius: normalize(8),
            },
          }}
        />
        <Tab.Screen
          name="Previous"
          component={Previous}
          options={{
            title: ({focused}) => (
              <>
                {TabHeader({
                  title: 'Previous',
                  focused,
                })}
              </>
            ),
            tabBarIndicatorStyle: {
              borderBottomColor: 'red',
              borderBottomWidth: normalize(3),
              borderRadius: normalize(8),
            },
          }}
        />
        <Tab.Screen
          name="Ongoing"
          component={Ongoing}
          options={{
            title: ({focused}) => (
              <>
                {TabHeader({
                  title: 'Ongoing',
                  focused,
                })}
              </>
            ),
            tabBarIndicatorStyle: {
              borderBottomColor: 'white',
              borderBottomWidth: normalize(3),
              borderRadius: normalize(8),
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BookingTopTab;

const styles = StyleSheet.create({});
