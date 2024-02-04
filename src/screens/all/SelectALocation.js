import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import normalize from '../../utils/helpers/normalize';
import {Fonts} from '../../themes/Fonts';
import {Icons} from '../../themes/Icons';

const SelectALocation = ({onPress}) => {
  const [searchLocation, setSearchLocation] = useState('');
  return (
    <View
      style={{
        flex: 1,
        padding: normalize(15),
      }}>
      <Text
        style={{
          fontFamily: Fonts.Poppins_Medium,
          fontSize: normalize(14),
          color: '#161616',
        }}>
        Select a location
      </Text>
      <View
        style={{
          height: normalize(45),
          width: '100%',
          borderRadius: normalize(8),
          borderColor: '#EBEBEB',
          borderWidth: normalize(1),
          flexDirection: 'row',
          marginTop: normalize(12),
          alignItems: 'center',
        }}>
        <Image
          source={Icons.Search}
          style={{
            height: normalize(16),
            width: normalize(35),
            resizeMode: 'contain',
            marginLeft: normalize(2),
          }}
        />
        <TextInput
          style={{
            flex: 1,
            paddingEnd: normalize(8),
          }}
          placeholderTextColor={'#757575'}
          placeholder='Search for area, street name. . .'
          value={searchLocation}
          onChangeText={txt => setSearchLocation(txt)}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          height: normalize(90),
          width: '100%',
          flexDirection: 'row',
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: normalize(1),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginLeft: normalize(26),
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(13),
              color: '#161616',
            }}>
            Use current location
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              fontSize: normalize(10.5),
              color: '#757575',
              marginTop: normalize(5)
            }}>
            {'Ayodhya Nagar Extension,\nAyodhya Bypass'}
          </Text>
        </View>
        <Image
          style={{
            height: normalize(12),
            width: normalize(12),
            resizeMode: 'contain',
          }}
          source={Icons.RightAngle}
        />
        <Image
          style={{
            height: normalize(18),
            width: normalize(18),
            resizeMode: 'contain',
            position: 'absolute',
            left: 0,
            top: normalize(18),
          }}
          source={Icons.position}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: Fonts.Poppins_Medium,
          fontSize: normalize(14),
          color: '#161616',
          marginTop: normalize(16),
        }}>
        Saved addresses
      </Text>

      <View
        style={{
          height: normalize(90),
          width: '100%',
          flexDirection: 'row',
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: normalize(1),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginLeft: normalize(30),
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(14),
              color: '#161616',
            }}>
            Home
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              fontSize: normalize(10),
              color: '#757575',
            }}>
            {
              '89, Bhel Nagar, Piplani, Ayodhya Bypass, Bhopal, Madhya Pradesh 462022, India '
            }
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(6),
            borderColor: '#EBEBEB',
            borderWidth: normalize(1),
            position: 'absolute',
            left: 0,
            top: normalize(24),
            height: normalize(24),
            width: normalize(24),
          }}>
          <Image
            style={{
              height: normalize(16),
              width: normalize(16),
              resizeMode: 'contain',
              opacity: 0.6,
            }}
            source={Icons.home2}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectALocation;
