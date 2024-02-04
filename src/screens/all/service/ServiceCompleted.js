import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
import {Images} from '../../../themes/Images';
import {Fonts} from '../../../themes/Fonts';
import {Icons} from '../../../themes/Icons';

const ServiceCompleted = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

      <Image
        style={{
          height: normalize(60),
          width: normalize(60),
          resizeMode: 'contain',
          marginTop: normalize(35),
        }}
        source={Icons.like}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          height: normalize(30),
          width: normalize(30),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: normalize(15),
          top: Platform.OS == 'ios' ? normalize(40) : normalize(10),
        }}>
        <Image
          style={{
            height: normalize(20),
            width: normalize(18),
            resizeMode: 'contain',
          }}
          source={Icons.close2}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: '#F5C443',
          fontSize: normalize(16),
          fontFamily: Fonts.Poppins_SemiBold,
          marginTop: normalize(15),
        }}>
        Service Completed
      </Text>

      <Text
        style={{
          color: '#161616',
          fontSize: normalize(13),
          fontFamily: Fonts.Poppins_Regular,
          marginTop: normalize(15),
          textAlign: 'center',
        }}>
        {
          'Dear Harry Styles please share your\nvaluable feedback. This will help us\nimprove our services.'
        }
      </Text>
      <View style={styles.card}>
        <Image source={Images.ac_service} style={styles.img} />
        <View style={{marginLeft: normalize(16)}}>
          <Text style={styles.heading11}>AC Service</Text>
          <Text style={styles.subtest12}>• 1 hrs</Text>
          <Text style={styles.subtest12}>• Includes dummy info</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceRating')}
        style={{
          backgroundColor: 'black',
          height: normalize(42),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: normalize(10),
          marginTop: normalize(16),
          position: 'absolute',
          bottom: normalize(40),
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: normalize(14),
            fontFamily: Fonts.Poppins_Medium,
          }}>
          Share Feedback
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ServiceCompleted;

const styles = StyleSheet.create({
  card: {
    padding: normalize(14),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: normalize(98),
  },
  img: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: 'contain',
    borderRadius: normalize(10),
  },
  heading11: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  heading12: {
    fontSize: normalize(11),
    color: '#757575',
    fontFamily: Fonts.Poppins_Regular,
  },
  card1: {
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(16),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(12),
    width: '90%',
    alignSelf: 'center',
  },
  img1: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: 'contain',
  },
  heading111: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  heading121: {
    fontSize: normalize(11),
    color: '#757575',
    fontFamily: Fonts.Poppins_Regular,
  },
});
