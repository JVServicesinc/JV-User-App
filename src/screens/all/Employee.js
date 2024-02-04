import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Icons} from '../../themes/Icons';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/normalize';
import Header from '../../components/Header';
import {Fonts} from '../../themes/Fonts';
import {Images} from '../../themes/Images';

const Employee = ({navigation}) => {
  const DATA = [
    {
      icon: Images.img16,
      title: 'Salon Classic',
      type: 'ECONOMICAL',
      batch: 'VLCC | RICHELON | Crave',
    },
    {
      icon: Images.img16,
      title: 'Salon Classic',
      type: 'ECONOMICAL',
      batch: 'VLCC | RICHELON | Crave',
    },
    {
      icon: Images.img16,
      title: 'Salon Classic',
      type: 'ECONOMICAL',
      batch: 'VLCC | RICHELON | Crave',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View
        style={{
          width: '100%',
          paddingHorizontal: normalize(15),
        }}>
        <Header title={''} />
      </View>

      <FlatList
        style={{
          flex: 1,
          bac: 'red',
        }}
        contentContainerStyle={{
          width: '90%',
          alignSelf: 'center',
        }}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ServiceDetails')}
              style={{
                height: normalize(90),
                width: '100%',
                flexDirection: 'row',
                marginBottom: normalize(10),
                borderRadius: normalize(6),
                backgroundColor: '#F8F8F8',
                padding: normalize(10),
                alignItems: 'center',
              }}>
              <Image
                source={Images.img16}
                style={{
                  height: '100%',
                  width: normalize(70),
                  resizeMode: 'cover',
                  borderRadius: normalize(8),
                  marginRight: normalize(15),
                }}
              />

              <View>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: normalize(14),
                    color: '#383838',
                  }}>
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(5),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#52B46B4A',
                      borderRadius: normalize(4),
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: normalize(18),
                      height: normalize(18),
                      marginRight: normalize(10),
                    }}>
                    <Text
                      style={{
                        color: '#52B46B',
                        fontSize: normalize(12),
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      $
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#A3A3A3',
                      fontFamily: Fonts.Poppins_Medium,
                      fontSize: normalize(11),
                    }}>
                    {item.type}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#7B7B7B',
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: normalize(11),
                    marginTop: normalize(5),
                  }}>
                  {item.batch}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ServiceDetails')}
                style={{
                  height: normalize(28),
                  width: normalize(28),
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: normalize(30),
                  position: 'absolute',
                  right: normalize(10),
                }}>
                <Image
                  source={Icons.RightAngle}
                  style={{
                    height: normalize(12),
                    width: normalize(12),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Employee;
