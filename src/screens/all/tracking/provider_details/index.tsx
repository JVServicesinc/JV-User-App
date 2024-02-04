import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import normalize from '../../../../utils/helpers/normalize';
import {Colors} from '../../../../themes/Colors';
import {Fonts} from '../../../../themes/Fonts';
import {Icons} from '../../../../themes/Icons';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  provider_arriving_info: {
    width: '90%',
    height: '20%',
    bottom: '10%',
    borderRadius: normalize(10),
    backgroundColor: '#333334',
    alignItems: 'center',
    justifyContent: 'center',
  },
  provider_details: {
    width: '100%',
    height: '30%',
    bottom: '4%',
    backgroundColor: 'red',
  },
  otp_details: {
    width: '95%',
    height: '20%',
    bottom: '2%',
    flexDirection: 'row',
    borderBottomWidth: normalize(0.6),
    borderBottomColor: Colors.grey_cloud,
  },
  otp_info: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  otp_text: {
    fontSize: normalize(14),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Regular,
  },
  otp_subtext: {
    fontSize: normalize(11),
    color: Colors.subtext,
    fontFamily: Fonts.Poppins_Regular,
  },
  otp: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otp_value: {
    fontSize: normalize(15),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Bold,
  },
  service_details: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '95%',
    height: '100%',
    padding: normalize(12),
    borderWidth: normalize(1.1),
    borderColor: Colors.grey_cloud,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: 'contain',
  },
  heading12: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_SemiBold,
  },
  subtext12: {
    fontSize: normalize(11),
    color: Colors.subtext,
    fontFamily: Fonts.Poppins_Regular,
  },
});

export const ProviderDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.provider_arriving_info}>
        <Text
          style={{
            fontSize: normalize(15),
            fontWeight: '500',
            color: Colors.white,
            fontFamily: Fonts.Poppins_Black,
          }}>
          Jim is on his way 🤘
        </Text>
        <Text
          style={{
            fontSize: normalize(10),
            fontWeight: '500',
            color: Colors.white,
            marginTop: '2%',
            fontFamily: Fonts.Poppins_Medium,
          }}>
          Arriving in 12 mins
        </Text>
      </View>
      <View style={styles.provider_details}></View>
      <View style={styles.otp_details}>
        <View style={styles.otp_info}>
          <Text style={styles.otp_text}>OTP</Text>
          <Text style={styles.otp_subtext}>
            share with service provider to start service
          </Text>
        </View>
        <View style={styles.otp}>
          <Text style={styles.otp_value}>4456</Text>
        </View>
      </View>
      <View style={styles.service_details}>
        <View style={styles.card}>
          <Image source={Icons.ACService} style={styles.img} />
          <View style={{marginLeft: normalize(16)}}>
            <Text style={styles.heading12}>AC Service</Text>
            <Text style={styles.subtext12}>• 1 hr</Text>
            <Text style={styles.subtext12}>• Includes dummy info</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
