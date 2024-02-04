import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';

import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Images} from '../../../themes/Images';

const RescheduleBooking = () => {
  const navigation = useNavigation();
  const Time = [
    {date: 'Sat', no: '09'},
    {date: 'Sun', no: '10'},
    {date: 'Mon', no: '11'},
  ];
  const date = [{time: '06:30 pm'}, {time: '07:30 pm'}, {time: '08:30 pm'}];

  const [dateArr, setDateArr] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());

  useEffect(() => {
    let now = new Date();
    const totalDays = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const today = now.getDate();
    const remainingDays = totalDays - today;
    var arr = [];
    for (let i = 0; i < remainingDays + 1; i++) {
      let date = moment().date(today + i);
      arr.push({
        date: date,
        day: moment(date).format('ddd'),
      });
    }
    setDateArr(arr);
  }, []);

  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <Header title={'Reschedule Booking'} />
        <ScrollView
        contentContainerStyle={{
          paddingBottom: normalize(60)
        }}
        showsVerticalScrollIndicator={false}>
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

          <Text style={{...styles.heading12, marginTop: normalize(20)}}>
            Select new date and time
          </Text>
          <Text style={{...styles.subtest12}}>
            Your service will take approx. 45 mins
          </Text>
          <View style={{marginTop: normalize(18)}}>
            {dateArr.length !== 0 && (
              <FlatList
                data={dateArr}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedDateIndex == index) {
                          setSelectedDateIndex(null);
                        } else {
                          setSelectedDateIndex(index);
                        }
                      }}
                      style={{
                        height: normalize(52),
                        width: normalize(60),
                        borderRadius: normalize(10),
                        borderWidth: normalize(1),
                        borderColor:
                          selectedDateIndex !== null
                            ? selectedDateIndex == index
                              ? Colors.black
                              : Colors.border
                            : Colors.border,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: normalize(8),
                      }}>
                      <Text style={{...styles.subtest12}}>{item?.day}</Text>
                      <Text style={{...styles.heading12}}>
                        {moment(item?.date).format('DD')}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
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
          {selectedDateIndex !== null && dateArr.length !== 0 && (
            <View style={{marginTop: normalize(18), alignSelf: 'center'}}>
              <DatePicker
                date={
                  new Date(
                    moment(dateArr[selectedDateIndex].date).format(
                      'YYYY-MM-DD',
                    ),
                  )
                }
                minimumDate={
                  new Date(
                    moment(dateArr[selectedDateIndex].date).format(
                      'YYYY-MM-DD',
                    ),
                  )
                }
                mode="time"
                onDateChange={setSelectedTime}
              />
            </View>
          )}
        </ScrollView>
        <View
          style={{
            ...styles.container,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('CancelBooking')}
            style={{...styles.btn, backgroundColor: Colors.black}}>
            <Text style={{...styles.btntext, color: Colors.white}}>
              Confirm new slot
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RescheduleBooking;

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
  imgIcon: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
  subtest12: {
    fontSize: normalize(11),
    color: Colors.subtext,
    fontFamily: Fonts.Poppins_Regular,
  },
  blk12: {
    fontSize: normalize(11),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Regular,
  },
  heading12: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_SemiBold,
  },
  card: {
    padding: normalize(12),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  address: {
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(16),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),

    marginTop: normalize(10),
  },
  payment: {
    paddingTop: normalize(14),
    // paddingHorizontal: normalize(16),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(10),
    marginTop: normalize(10),
  },
  faj: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
  },
  container: {
    position: 'absolute',
    bottom: normalize(10),
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
  btn: {
    width: Dimensions.get('window').width * 0.9,
    paddingVertical: normalize(9),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btntext: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
  },
});
