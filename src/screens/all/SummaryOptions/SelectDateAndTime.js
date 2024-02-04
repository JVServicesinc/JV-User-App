import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {memo, useState} from 'react';
import normalize from '../../../utils/helpers/normalize';
import {Fonts} from '../../../themes/Fonts';
import {Images} from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';

const SelectDateAndTime = ({onPress}) => {
  const [details, setDetails] = useState({
    selectDate: '',
    selectTime: '',
    isSelectDateTime: false,
  });
  const [showServiceSlots, setShowServiceSlots] = useState();

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: normalize(15),
        height: '100%',
      }}>
      <Text
        style={{
          color: '#161616',
          fontFamily: Fonts.Poppins_Medium,
          fontSize: normalize(14),
          marginTop: normalize(15),
        }}>
        Select date and time
      </Text>

      <Text
        style={{
          color: '#757575',
          fontFamily: Fonts.Poppins_Regular,
          fontSize: normalize(10),
          marginTop: normalize(5),
        }}>
        Your service will take approx. 45 mins
      </Text>

      <View
        style={{flexDirection: 'row', marginTop: normalize(25), width: '100%'}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row'}}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
            (item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (details.selectDate == `1${index}`) {
                      setDetails(pre => ({
                        ...pre,
                        selectDate: '',
                      }));
                    } else {
                      setDetails(pre => ({
                        ...pre,
                        selectDate: `1${index}`,
                      }));
                    }
                  }}
                  style={{
                    width: normalize(45),
                    borderRadius: normalize(8),
                    backgroundColor:
                      details.selectDate == `1${index}` ? '#F2ECFD' : '#fff',
                    borderColor:
                      details.selectDate == `1${index}` ? '#5E17EB' : '#E3E3E3',
                    borderWidth: normalize(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: normalize(40),
                    marginRight: normalize(10),
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(10),
                      color:
                        details.selectDate == `1${index}`
                          ? '#5E17EB'
                          : '#ABABAB',
                      fontFamily: Fonts.Poppins_Regular,
                    }}>
                    {item}
                  </Text>
                  <Text
                    style={{
                      fontSize: normalize(10),
                      color:
                        details.selectDate == `1${index}` ? '#5E17EB' : 'black',
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    1{index}
                  </Text>
                </TouchableOpacity>
              );
            },
          )}
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: '#EBEBEB',
          height: normalize(40),
          borderRadius: normalize(6),
          marginTop: normalize(15),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: normalize(10),
        }}>
        <Image
          style={{
            height: normalize(16),
            width: normalize(16),
            resizeMode: 'contain',
            position: 'absolute',
            top: -normalize(10.5),
            left: normalize(12),
          }}
          source={Images.uparrow}
        />
        <Image
          style={{
            height: normalize(18),
            width: normalize(18),
            resizeMode: 'contain',
            marginRight: normalize(5),
          }}
          source={Images.tooltip}
        />
        <Text
          style={{
            color: '#161616',
            fontSize: normalize(9),
            fontFamily: Fonts.Poppins_Regular,
          }}>
          {
            'Free cancellation till 2hrs before the booked\nslot, post that $50 chargeable'
          }
        </Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: normalize(15)}}>
        {['06:30 PM', '07:30 PM', '08:30 PM'].map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (details.selectTime == item) {
                  setDetails(pre => ({
                    ...pre,
                    selectTime: '',
                  }));
                } else {
                  setDetails(pre => ({
                    ...pre,
                    selectTime: item,
                  }));
                }
              }}
              style={{
                width: normalize(58),
                borderRadius: normalize(8),
                backgroundColor:
                  details.selectTime == item ? '#F2ECFD' : '#fff',
                borderColor: details.selectTime == item ? '#5E17EB' : '#E3E3E3',
                borderWidth: normalize(1),
                justifyContent: 'center',
                alignItems: 'center',
                height: normalize(24),
                marginRight: normalize(10),
              }}>
              <Text
                style={{
                  fontSize: normalize(10),
                  color: details.selectTime == item ? '#5E17EB' : '#ABABAB',
                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        disabled={
          details.selectDate !== '' && details.selectTime !== '' ? false : true
        }
        onPress={() => {
          onPress({
            selectDate: details.selectDate,
            selectTime: details.selectTime,
            isSelectDateTime: true,
          });
        }}
        style={{
          backgroundColor:
            details.selectDate !== '' && details.selectTime !== ''
              ? 'black'
              : '#D8D8D8',
          height: normalize(42),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: normalize(10),
          marginTop: normalize(16),
          position: 'absolute',
          bottom: normalize(40),
          width: '100%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color:
              details.selectDate !== '' && details.selectTime !== ''
                ? 'white'
                : '#858585',
            fontSize: normalize(14),
            fontFamily: Fonts.Poppins_Medium,
          }}>
          Save and proceed to slots
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(SelectDateAndTime);
