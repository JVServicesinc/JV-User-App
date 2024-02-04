import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
import {Images} from '../../../themes/Images';
import {Fonts} from '../../../themes/Fonts';

const PaymentSuccessfull = ({navigation}) => {
  const DATA = [
    {
      title: 'Payment Mode',
      subTitle: 'UPI',
    },
    {
      title: 'Total Amount',
      subTitle: '$749 ',
    },
    {
      title: 'Pay Date',
      subTitle: 'Apr 10, 2022',
    },
    {
      title: 'Pay Time',
      subTitle: '10:45 am',
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

      <ImageBackground
        source={Images.successbg}
        resizeMode={'contain'}
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
        }}>
        <Image
          source={Images.succcesfull}
          style={{
            height: normalize(85),
            width: normalize(85),
            resizeMode: 'contain',
            position: 'absolute',
            alignSelf: 'center',
            top: Platform.OS == 'ios' ? normalize(80) : normalize(100),
          }}
        />

        <Text
          style={{
            color: '#5E17EB',
            fontSize: normalize(13),
            fontFamily: Fonts.Poppins_Regular,
            alignSelf: 'center',
            marginTop: Platform.OS == 'ios' ? '56%' : '62%',
          }}>
          Great
        </Text>

        <Text
          style={{
            color: '#161616',
            fontSize: normalize(16),
            fontFamily: Fonts.Poppins_Bold,
            alignSelf: 'center',
            marginTop: normalize(10),
            marginBottom: normalize(5),
          }}>
          Payment Success
        </Text>

        <View>
          <FlatList
            data={DATA}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: normalize(50),
                    marginTop: normalize(12),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      color: '#757575',
                      fontSize: normalize(12),
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      color: '#757575',
                      fontSize: normalize(12),
                    }}>
                    {item.subTitle}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: Platform.OS == 'ios' ? normalize(75) : normalize(60),
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              color: '#757575',
              fontSize: normalize(12),
              alignSelf: 'center',
            }}>
            Total Pay
          </Text>

          <Text
            style={{
              fontFamily: Fonts.Poppins_Bold,
              color: '#5E17EB',
              fontSize: normalize(15),
              alignSelf: 'center',
              marginTop: Platform.OS == 'ios' ? normalize(5) : 0,
            }}>
            $749
          </Text>
        </View>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BookingSuccessfull');
        }}
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
          Done
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentSuccessfull;
