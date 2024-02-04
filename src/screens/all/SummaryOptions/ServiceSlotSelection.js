import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from '../../../utils/helpers/normalize';
import {Fonts} from '../../../themes/Fonts';
import useWeekDaysWithDate from '../../../utils/hooks/useWeekdaysWithDate';
import moment from 'moment';
import {
  getServiceSlots,
  updateServiceItemSlot,
} from '../../../services/Endpoints';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../themes/Colors';
import _ from 'lodash';
import SlotSkeleton from './components/SlotSkeleton';
import {convertTo24HourFormat} from '../../../utils/helpers/time';
import {ShowToast} from '../../../utils/helpers/Toast';
import { setIsFetching } from '../../../redux/reducer/GlobalSlice';
const ServiceSlotSelection = ({serviceId, cartItemId, fetchCart, hideModal}) => {
  //   const WEEKDAYS = [
  //     {
  //       day: 'Mon',
  //       id: 0,
  //     },
  //     {
  //       day: 'Tue',
  //       id: 1,
  //     },
  //     {
  //       day: 'Wed',
  //       id: 2,
  //     },
  //     {
  //       day: 'Thu',
  //       id: 3,
  //     },
  //     {
  //       day: 'Fri',
  //       id: 4,
  //     },
  //     {
  //       day: 'Sat',
  //       id: 5,
  //     },
  //     {
  //       day: 'Sun',
  //       id: 6,
  //     },
  //   ];
  const {cartData} = useSelector(state => state.GlobalReducer);
  const WEEKDAYS = useWeekDaysWithDate();
  const WEEKDAYSIDMAP = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  const [details, setDetails] = useState({
    selectDate: moment().format('ddd'),
    selectTime: '',
    isSelectDateTime: false,
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    moment().add(1, 'd').format('ddd'),
  );
  const [selectedSlot, setSelectedSlot] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const dayId = WEEKDAYSIDMAP[selectedDay];
    (async () => {
      setIsLoadingSlots(true);
      try {
        const res = await getServiceSlots(serviceId, dayId);
        if (res?.status == 200) {
          setAvailableSlots(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoadingSlots(false);
    })();
  }, [selectedDay]);

  const handleSlotSelection = async () => {
    try {
      dispatch(setIsFetching(true));
      const cartId = cartData?.cart_id;
      const dayId = WEEKDAYSIDMAP[selectedDay];

      const time = convertTo24HourFormat(selectedSlot?.timing);

      console.log(cartId, serviceId, dayId, time);

      const data = new FormData();
      data.append('weekday_number', dayId);
      data.append('timing', time);
      const res = await updateServiceItemSlot(cartId, cartItemId, data);
      if (res?.status == 200) {
        console.log(res?.data);
        ShowToast(res?.data?.message);
        await fetchCart();
        hideModal();
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsFetching(false));
  };

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: normalize(15),
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: normalize(25),
          width: '100%',
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row'}}>
          {WEEKDAYS.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  selectedDay !== item?.day && setSelectedDay(item?.day)
                }
                style={{
                  width: normalize(45),
                  borderRadius: normalize(8),
                  backgroundColor:
                    selectedDay == item?.day ? '#F2ECFD' : '#fff',
                  borderColor: selectedDay == item?.day ? '#5E17EB' : '#E3E3E3',
                  borderWidth: normalize(1),
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: normalize(40),
                  marginRight: normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: selectedDay == item?.day ? '#5E17EB' : '#ABABAB',
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  {item?.day}
                </Text>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: selectedDay == item?.day ? '#5E17EB' : 'black',
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  {moment(item?.date).format('DD')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={{height: '70%', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', marginTop: normalize(15)}}>
          {isLoadingSlots ? (
            <SlotSkeleton />
          ) : !_.isEmpty(availableSlots) ? (
            availableSlots.map((item, index) => {
              const status =
                item?.id === selectedSlot?.id &&
                selectedDay == String(item?.weekday_name).substring(0, 3);
              return (
                <TouchableOpacity
                  style={{
                    width: normalize(58),
                    borderRadius: normalize(8),
                    backgroundColor: status ? '#F2ECFD' : '#fff',
                    borderColor: status ? '#5E17EB' : '#E3E3E3',
                    borderWidth: normalize(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: normalize(24),
                    marginRight: normalize(10),
                  }}
                  onPress={() => setSelectedSlot(item)}>
                  <Text
                    style={{
                      fontSize: normalize(10),
                      color: status ? '#5E17EB' : '#ABABAB',
                      fontFamily: Fonts.Poppins_Regular,
                    }}>
                    {item?.timing}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View>
              <Text>No slots available</Text>
            </View>
          )}
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            height: normalize(55),
            justifyContent: 'center',
            marginBottom: normalize(30),
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={handleSlotSelection}
            style={{
              backgroundColor: Colors.black,
              height: normalize(42),
              justifyContent: 'center',
              marginHorizontal: normalize(15),
              alignItems: 'center',
              borderRadius: normalize(10),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Select Slot
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceSlotSelection;

const styles = StyleSheet.create({});
