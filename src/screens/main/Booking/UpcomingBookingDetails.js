import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';

import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';

const UpcomingBookingDetails = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          marginHorizontal: normalize(15),
        }}>
        <Header title={'Upcoming Booking'} />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: normalize(95),
          paddingHorizontal: normalize(15),
          paddingTop: normalize(10),
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text15}>10th{'\n'}Apr, Sunday</Text>

        <View style={styles.card}>
          <Image source={Icons.testone} style={styles.img} />
          <View style={{marginLeft: normalize(16)}}>
            <Text style={styles.heading12}>Diamond Facial</Text>
            <Text style={styles.subtest12}>• 2 hrs</Text>
            <Text style={styles.subtest12}>• Includes dummy info</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={Icons.testtwo} style={styles.img} />
          <View style={{marginLeft: normalize(16)}}>
            <Text style={styles.heading12}>Diamond Facial</Text>
            <Text style={styles.subtest12}>• 30 min</Text>
            <Text style={styles.subtest12}>• Includes dummy info</Text>
          </View>
        </View>

        <View style={styles.payment}>
          <Text
            style={{
              ...styles.heading12,
              marginBottom: normalize(10),
              textDecorationLine: 'underline',
              marginLeft: normalize(14),
            }}>
            Billing Details
          </Text>
          <View style={styles.faj}>
            <Text style={styles.blk12}>Item Total</Text>
            <Text style={styles.blk12}>$699</Text>
          </View>
          <View style={styles.faj}>
            <Text style={styles.blk12}>Item Discount</Text>
            <Text style={{...styles.blk12, color: '#52B46B'}}>-$50</Text>
          </View>
          <View style={styles.faj}>
            <Text style={styles.blk12}>Convinience Fee</Text>
            <Text style={styles.blk12}>$50</Text>
          </View>
          <View
            style={{
              ...styles.faj,
              marginTop: normalize(14),
              marginBottom: normalize(5),
            }}>
            <Text style={styles.heading12}>Grand Total</Text>
            <Text style={styles.heading12}>$749</Text>
          </View>

          <View
            style={{
              backgroundColor: Colors.gray,
              height: normalize(30),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: normalize(14),
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <Text style={styles.blk12}>Payment mode</Text>
            <Text style={styles.blk12}>SeekMe Wallet</Text>
          </View>
        </View>

        <View style={styles.address}>
          <Image
            source={Icons.AdrsIcon}
            style={{
              height: normalize(18),
              width: normalize(18),
              resizeMode: 'contain',
              position: 'absolute',
              top: normalize(14),
              left: normalize(14),
            }}
          />
          <Text
            style={{
              ...styles.heading12,
              fontSize: normalize(12),
              marginLeft: normalize(24),
            }}>
            Home
          </Text>
          <Text
            style={{
              ...styles.subtest12,
              fontSize: normalize(10),
              marginLeft: normalize(24),
            }}>
            89, Bhel Nagar, Piplani, Ayodhya Bypass, Bhopal,MadhyaPradesh
            462022, India
          </Text>
          <Text
            style={{
              ...styles.subtest12,
              fontSize: normalize(10),
              marginLeft: normalize(24),
              marginTop: normalize(5),
            }}>
            Sat, Apr 09 - 07:30 PM
          </Text>
          <Image
            source={Icons.Clock}
            style={{
              height: normalize(18),
              width: normalize(18),
              resizeMode: 'contain',
              position: 'absolute',
              bottom: normalize(14),
              left: normalize(14),
            }}
          />
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          position: 'absolute',
          paddingBottom: normalize(30),
          alignSelf: 'center',
          paddingTop: normalize(10),
          bottom: 0,
          paddingHorizontal: normalize(10),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CancelBooking')}
          style={{...styles.btn, backgroundColor: Colors.deactive}}>
          <Text style={{...styles.btntext, color: Colors.black}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RescheduleBooking')}
          style={{...styles.btn, backgroundColor: Colors.button_color}}>
          <Text style={{...styles.btntext, color: Colors.white}}>
            Reshedule
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Support')}
        activeOpacity={0.8}
        style={styles.touchHelp}>
        <Image source={Icons.help} style={styles.helpImg} />
        <Text style={styles.helpTitle}>Help</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UpcomingBookingDetails;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
  text15: {
    fontSize: normalize(15),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  img: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: 'contain',
  },
  subtest12: {
    fontSize: normalize(10.5),
    color: '#757575',
    fontFamily: Fonts.Poppins_Regular,
  },
  blk12: {
    fontSize: normalize(10),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Regular,
    marginTop: normalize(5),
  },
  heading12: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_SemiBold,
  },
  card: {
    padding: normalize(14),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  address: {
    padding: normalize(14),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    marginTop: normalize(10),
  },
  payment: {
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(10),
    marginTop: normalize(10),
    paddingTop: normalize(14),
    paddingBottom: normalize(35),
  },
  faj: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(14),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '48%',
    paddingVertical: normalize(12),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
  },
  helpImg: {
    tintColor: Colors.white,
    height: normalize(22),
    width: normalize(22),
    resizeMode: 'contain',
  },
  helpTitle: {
    fontSize: normalize(13),
    fontWeight: '600',
    color: Colors.white,
    marginTop: normalize(1.5),
  },
  touchHelp: {
    backgroundColor: Colors.tealish_green,
    height: normalize(62),
    width: normalize(62),
    position: 'absolute',
    bottom: normalize(82),
    right: normalize(15),
    borderRadius: normalize(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: normalize(3),
    shadowColor: 'rgba(0,0,0,0.2)',
    elevation: normalize(8),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: normalize(12),
  },
});
