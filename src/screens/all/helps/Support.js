import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';

const Support = ({navigation}) => {
  const OPTIONS = [
    {
      title: 'Chat support',
      icon: Icons.chat,
    },
    {
      title: 'Call support',
      icon: Icons.call,
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

        <Header title={'Support'} />

        <Image
          source={Icons.headphone}
          style={{
            resizeMode: 'contain',
            height: normalize(55),
            width: normalize(55),
            alignSelf: 'center',
            marginTop: normalize(15),
          }}
        />

        <Text
          style={{
            color: '#161616',
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: normalize(16),
            alignSelf: 'center',
            marginVertical: normalize(30),
          }}>
          How can we help you ?
        </Text>

        {OPTIONS.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (index == 0) {
                  navigation.navigate('SupportChat');
                }
              }}
              style={{
                height: normalize(42),
                flexDirection: 'row',
                backgroundColor: '#F0F0F0',
                marginBottom: normalize(12),
                borderRadius: normalize(6),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: normalize(10),
              }}>
              <Image
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  resizeMode: 'contain',
                  position: 'absolute',
                  left: normalize(10),
                }}
                source={item.icon}
              />

              <Text
                style={{
                  color: '#161616',
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(11),
                  marginLeft: normalize(18),
                }}>
                {item.title}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  if (index == 0) {
                    navigation.navigate('SupportChat');
                  }
                }}
                style={{
                  backgroundColor: '#fff',
                  height: normalize(20),
                  width: normalize(20),
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: normalize(12),
                    width: normalize(12),
                    resizeMode: 'contain',
                  }}
                  source={Icons.arrowRight}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={{
            backgroundColor: '#F0F0F0',
            height: normalize(45),
            width: normalize(45),
            borderRadius: normalize(50),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: normalize(45),
          }}>
          <Image
            style={{
              height: normalize(22),
              width: normalize(22),
              resizeMode: 'contain',
            }}
            source={Icons.mail}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: '#757575',
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(10),
            alignSelf: 'center',
            marginTop: normalize(10),
          }}>
          or mail us at
        </Text>
        <Text
          style={{
            color: '#161616',
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: normalize(12),
            alignSelf: 'center',
          }}>
          hello@jeveux.co
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Support;
