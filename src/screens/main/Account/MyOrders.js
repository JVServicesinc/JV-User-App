import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '../../../themes/Icons';
import {Images} from '../../../themes/Images';
const {width, height} = Dimensions.get('window');

const MyOrders = () => {
  const ARR = [
    {
      icon: Icons.door_lock,
      title: 'Long handle with lock',
      subTitle: '• 1 hr\n• Includes dummy info',
    },
    {
      icon: Icons.shower,
      title: 'Shower head',
      subTitle: '• Part info\n• Includes dummy info',
      price: '$299',
    },
    {
      icon: Icons.hangers,
      title: 'Godrej Door closer',
      subTitle: '• 1 hr\n• Includes dummy info',
      price: '$499',
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <Header title={'My Orders'} />

        <TouchableOpacity
          style={{
            width: normalize(40),
            height: normalize(40),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: normalize(10),
          }}>
          <Image
            source={Icons.filter}
            style={{
              resizeMode: 'contain',
              height: normalize(20),
              width: normalize(20),
            }}
          />
        </TouchableOpacity>

        <FlatList
          style={{
            backgroundColor: Colors.white,
            height: '100%',
            width: '100%',
          }}
          data={ARR}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: normalize(50),
          }}
          renderItem={({item, index}) => {
            return (
              <>
                <View style={styles.sc}>
                  <Image source={item.icon} style={styles.si} />
                  <View>
                    <Text style={[styles.otpt, {fontSize: normalize(12)}]}>
                      {item.title}
                    </Text>
                    <Text style={styles.st}>{item.subTitle}</Text>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  otpt: {
    color: '#161616',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(13),
  },
  sc: {
    height: normalize(80),
    width: '100%',
    alignSelf: 'center',
    borderWidth: normalize(1.5),
    borderColor: '#F3F3F3',
    borderRadius: normalize(10),
    marginTop: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(8),
  },
  si: {
    resizeMode: 'cover',
    height: normalize(60),
    width: normalize(70),
    borderRadius: normalize(8),
    marginRight: normalize(10),
  },
  st: {
    color: '#757575',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(10),
  },
});
