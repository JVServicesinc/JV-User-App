import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';
import {useIsFocused} from '@react-navigation/native';
import _ from 'lodash';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import showErrorAlert from '../../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../utils/helpers/Loader';
import {getAllAddressRequest} from '../../../redux/reducer/UserReducer';
import LottieView from 'lottie-react-native';

const ManageAddress = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getAllAddressRequest());
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && UserReducer.status == 'User/getAllAddressSuccess') {
      setAddressList(UserReducer?.getAddressAllRes?.data);
    }
  }, [UserReducer, isFocused]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const renderItem = useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddNewAddress', {
            _type: 'edit',
            data: item,
          })
        }
        activeOpacity={0.6}
        style={{
          borderColor: Colors.border,
          borderBottomWidth: normalize(1),
          paddingVertical: normalize(12),
        }}>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(14),
            color: '#161616',
            textTransform: 'capitalize',
          }}>
          {item?.landmark_type}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Regular,
            fontSize: normalize(10),
            color: Colors.davy_grey,
            textTransform: 'capitalize',
          }}>
          {item?.first_name + ' ' + item?.last_name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Regular,
            fontSize: normalize(10),
            color: '#757575',
          }}>
          {item?.street_address + ', '}
          {item?.city + ', '}
          {item?.province + ', '}
          {item?.zip_code + ', '}
          {item.country_name}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <Loader visible={UserReducer.status == 'User/getAllAddressRequest'} />
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <Header title={'Manage Address'} />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddNewAddress', {
              _type: 'add',
              data: {},
            })
          }
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: normalize(40),
            marginTop: normalize(5),
            borderColor: Colors.border,
            borderBottomWidth: normalize(1),
            marginBottom: 2,
          }}>
          <Image
            style={{
              height: normalize(12),
              width: normalize(12),
              marginRight: normalize(10),
              tintColor: '#525252',
            }}
            source={Icons.add}
          />
          <Text
            style={{
              color: '#525252',
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(12),
            }}>
            {'Add another address'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={addressList}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            paddingBottom: normalize(30),
          }}
          style={{flex: 1}}
          renderItem={renderItem}
          ListEmptyComponent={
            <View
              style={{
                marginTop: normalize(70),
              }}>
              <LottieView
                source={require('../../../assets/json/no_data.json')}
                autoPlay
                loop
                style={{
                  height: normalize(250),
                  width: normalize(250),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color: '#068a8a',
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(14),
                  alignSelf: 'center',
                }}>
                No Address Found
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ManageAddress;
