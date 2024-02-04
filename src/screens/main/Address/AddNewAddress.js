import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import Modal from 'react-native-modal';
import {CountryPicker} from 'react-native-country-codes-picker';
import normalize from '../../../utils/helpers/normalize';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '../../../themes/Icons';
import {countryStates, getCurrentLocation} from '../../../utils/helpers/halper';
import Geocoder from 'react-native-geocoding';
const {width, height} = Dimensions.get('window');
import _ from 'lodash';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import showErrorAlert from '../../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddressRequest,
  updateAddressRequest,
} from '../../../redux/reducer/UserReducer';
import Loader from '../../../utils/helpers/Loader';
import constants from '../../../utils/helpers/constants';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const API_KEY =
  Platform.OS === 'ios' ? constants.IOS_API_KEY : constants.ANDROID_API_KEY;
const GEO = Geocoder.init(API_KEY);

const AddNewAddress = ({route}) => {
  const {_type, data} = route?.params;
  const states = countryStates;
  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const userInfo = UserReducer?.userInfo;
  const navigation = useNavigation();

  var names = userInfo?.full_name ? userInfo?.full_name.split(' ') : '';

  const [firstName, setFristName] = useState(
    names[0] !== undefined ? names[0] : '',
  );
  const [lastName, setLastName] = useState(
    names[1] !== undefined ? names[1] : '',
  );
  const [currentLocation, setCurrentLocation] = useState({});
  const [country, setCountry] = useState('');
  const [pincode, setPinCode] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandMark] = useState('');
  const [locationType, setLocationType] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState(null);
  const [countryCode, setCountryCode] = useState(
    userInfo?.country_code ? userInfo?.country_code : '+1',
  );
  const [phone, setPhone] = useState(userInfo?.mobile ? userInfo?.mobile : '');
  const [email, setEmail] = useState(userInfo?.email ? userInfo?.email : '');

  const [stateList, setStateList] = useState([]);
  const [edit, setEdit] = useState(false);

  let nameCheck = /^[a-zA-Z ]{0,100}$/;
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneNum = /^(?![.-])\d{10,}$/;

  const save = async (_ty, data) => {
    if (!nameCheck.test(firstName)) {
      showErrorAlert('Please enter a valid first name');
    } else if (!nameCheck.test(lastName)) {
      showErrorAlert('Please enter a valid last name');
    } else if (!phoneNum.test(phone)) {
      showErrorAlert('Please enter a valid phone number');
    } else if (!regex.test(email)) {
      showErrorAlert('Please enter a vaild email address');
    } else {
      let fromdata = new FormData();
      fromdata.append('first_name', firstName);
      fromdata.append('last_name', lastName);
      fromdata.append('country_name', country);
      fromdata.append('street_address', address);
      fromdata.append('city', city);
      fromdata.append('province', state);
      fromdata.append('zip_code', pincode);
      fromdata.append('country_code', countryCode);
      fromdata.append('phone', phone);
      fromdata.append('email', email.toLocaleLowerCase().trim());
      fromdata.append('locality', locality);
      fromdata.append('landmark', landmark);
      fromdata.append('landmark_type', locationType.toLowerCase());

      if (apartment !== '') {
        fromdata.append('apartment', apartment);
      }

      add(_ty, data, fromdata);
    }
  };

  function add(_type, data, obj) {
    isInternetConnected()
      .then(() => {
        if (_type !== 'edit') {
          dispatch(addAddressRequest(obj));
        } else {
          dispatch(
            updateAddressRequest({
              id: data?.id,
              data: obj,
            }),
          );
        }
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }

  const countryList = [
    {
      flag: Icons.india,
      code: '+91',
      name: 'India',
    },
    {
      flag: Icons.canada,
      code: '+1',
      name: 'Canada',
    },
  ];

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      country !== '' &&
      address !== '' &&
      city !== '' &&
      state !== '' &&
      locality !== '' &&
      pincode !== '' &&
      phone !== '' &&
      email !== '' &&
      landmark !== '' &&
      locationType !== ''
    ) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [
    firstName,
    lastName,
    country,
    pincode,
    locality,
    address,
    city,
    state,
    landmark,
    email,
    phone,
    locationType,
  ]);

  useEffect(() => {
    if (_type == 'edit') {
      setFristName(data?.first_name);
      setLastName(data?.last_name);
      setCountry(data?.country_name);
      setCity(data?.city);
      setPinCode(data?.zip_code);
      setPhone(data?.phone);
      setEmail(data?.email);
      setCountryCode(data?.country_code);
      setLocality(data?.locality);
      setLandMark(data?.landmark);
      setLocationType(data?.landmark_type);
      setState(data?.province);
      setAddress(data?.street_address);
      setApartment(data?.apartment !== null ? data?.apartment : '');
    }
  }, [_type, data]);

  function getCurrentloc() {
    getCurrentLocation(res => {
      if (res !== false) {
        setCurrentLocation({
          latitude: res?.latitude,
          longitude: res?.longitude,
          latitudeDelta: 0.015, // 0.03
          longitudeDelta: 0.0121, // 0.03
        });

        getAddress(res);
      }
    });
  }

  function getAddress(coordinate) {
    // console.log('coordinate -- ',coordinate);
    Geocoder.from(coordinate.latitude, coordinate.longitude)
      .then(json => {
        console.log('Location JSON --- ', json);
        let d = json.results[0]?.address_components;

        if (!_.isEmpty(d)) {
          let obj = {
            plus_code: getdetails(d, 'plus_code'),
            postal_code: getdetails(d, 'postal_code'),
            city: getdetails(d, 'locality'),
            dist: getdetails(d, 'administrative_area_level_3'),
            state: getdetails(d, 'administrative_area_level_1'),
            country: getdetails(d, 'country'),
          };

          let s = states.filter(item => item.country == obj.country);

          if (!_.isEmpty(s)) {
            setState(obj?.state);
            setCity(obj?.dist);
            setCountry(obj?.country);
            setPinCode(obj?.postal_code);
            setLocality(obj?.city);
          } else {
            showErrorAlert(
              'Sorry, Service is not available your current address',
            );
          }
        }
      })
      .catch(error => console.log('addressComponent error ', error));

    Geocoder.from({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    Geocoder.from({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    });

    Geocoder.from([coordinate.latitude, coordinate.longitude]);
  }

  function getdetails(arr, type) {
    let p = arr.filter(itm => itm?.types[0] == type);
    return !_.isEmpty(p) ? p[0]?.long_name : '';
  }

  return (
    <SafeAreaView style={styles.primary}>
      <Loader
        visible={
          UserReducer.status == 'User/addAddressRequest' ||
          UserReducer.status == 'User/updateAddressRequest'
        }
      />
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <Header title={_type !== 'edit' ? 'Add Address' : 'Edit Address'} />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: normalize(100),
          }}
          style={{
            flex: 1,
          }}> */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: normalize(100),
          }}
          style={{
            flex: 1,
          }}>
          {_type !== 'edit' ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => getCurrentloc()}
              style={{
                height: normalize(90),
                width: '100%',
                flexDirection: 'row',
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: normalize(1),
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: normalize(30),
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
                    marginTop: normalize(5),
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
          ) : null}

          <Text style={styles.title}>First name</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setFristName(text);
                }}
                value={firstName}
                keyboardType="numeric"
                maxLength={14}
              />
            </View>
          </View>

          <Text style={styles.title}>Last name</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setLastName(text);
                }}
                value={lastName}
                keyboardType="numeric"
                maxLength={14}
              />
            </View>
          </View>

          <Text style={styles.title}>Country / Region</Text>
          <View style={styles.subcon}>
            <TouchableOpacity
              onPress={() => {
                setType('country');
                setIsVisible(true);
              }}
              activeOpacity={0.5}
              style={{
                ...styles.inputContainer,
                height: normalize(35),
              }}>
              <Text style={styles.title1}>{country}</Text>

              <Image source={Icons.down_arrow} style={styles.img} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Apartment (Optional)</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setApartment(text);
                }}
                value={apartment}
              />
            </View>
          </View>

          <Text style={styles.title}>Street Address</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setAddress(text);
                }}
                value={address}
              />
            </View>
          </View>

          <Text style={styles.title}>City</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setCity(text);
                }}
                value={city}
                maxLength={14}
              />
            </View>
          </View>

          <Text style={styles.title}>Province</Text>
          <View style={styles.subcon}>
            <TouchableOpacity
              onPress={() => {
                setType('state');
                setIsVisible(true);
              }}
              activeOpacity={0.5}
              style={{
                ...styles.inputContainer,
                height: normalize(35),
              }}>
              <Text style={styles.title1}>{state}</Text>

              <Image source={Icons.down_arrow} style={styles.img} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Postal code</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setPinCode(text);
                }}
                value={pincode}
                keyboardType="numeric"
                maxLength={8}
              />
            </View>
          </View>

          <Text style={styles.title}>Locality</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setLocality(text);
                }}
                value={locality}
              />
            </View>
          </View>

          <Text style={styles.title}>Mobile Number</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
                // backgroundColor: Colors.deactive,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setType('country_code');
                  setIsVisible(true);
                }}
                style={styles.touch}>
                <Text style={styles.country}>{countryCode}</Text>
                <Image source={Icons.down_arrow} style={styles.img} />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setPhone(text);
                }}
                maxLength={14}
                value={phone}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.title}>Email</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setEmail(text);
                }}
                value={email}
              />
            </View>
          </View>

          <Text style={styles.title}>Landmark {/* (Optional) */}</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setLandMark(text);
                }}
                value={landmark}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {['home', 'others'].map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (locationType == item) {
                      setLocationType('');
                    } else {
                      setLocationType(item);
                    }
                  }}
                  style={{
                    width: normalize(45),
                    borderRadius: normalize(8),
                    backgroundColor: locationType == item ? '#F7F7F7' : '#fff',
                    borderColor: locationType == item ? '#000000' : '#E3E3E3',
                    borderWidth: normalize(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: normalize(24),
                    marginRight: normalize(10),
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(10),
                      color: locationType == item ? '#000000' : '#ABABAB',
                      fontFamily: Fonts.Poppins_Regular,
                      textTransform: 'capitalize',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            // bottom: normalize(15),
            alignSelf: 'center',
            backgroundColor: 'white',
            paddingBottom: normalize(15),
            bottom: 0,
            paddingTop: normalize(5),
          }}>
          <TouchableOpacity
            disabled={edit ? false : true}
            style={{
              backgroundColor: edit ? 'black' : '#D8D8D8',
              alignItems: 'center',
              borderRadius: 10,
              height: normalize(40),
              justifyContent: 'center',
            }}
            onPress={() => save(_type, data)}>
            <Text style={{color: edit ? 'white' : '#858585', fontSize: 16}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={isVisible}
          style={{
            width: '100%',
            alignSelf: 'center',
            margin: 0,
          }}
          animationInTiming={600}
          animationOutTiming={800}
          backdropOpacity={0.3}
          backdropColor={Colors.black}
          onBackButtonPress={() => {
            setIsVisible(false);
          }}
          onBackdropPress={() => {
            setIsVisible(false);
          }}>
          <View
            style={[
              styles.mainContainer,
              {
                height: type !== 'state' ? '30%' : '45%',
              },
            ]}>
            <FlatList
              data={type == 'state' ? stateList : countryList}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingBottom: normalize(30),
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(false);

                      if (type == 'country_code') {
                        setCountryCode(item.code);
                      } else if (type == 'state') {
                        setState(item);
                      } else {
                        if (country !== item.name) {
                          setState('');
                        }
                        setCountry(item.name);
                        var c = item.name;
                        let s = states.filter(item => item.country == c);

                        if (!_.isEmpty(s)) {
                          setStateList(s[0]?.states);
                        } else {
                          setStateList([]);
                          setState('');
                        }
                      }
                    }}
                    style={styles.touch1}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {type !== 'state' && (
                        <Image
                          source={item.flag}
                          style={{
                            resizeMode: 'contain',
                            height: normalize(30),
                            width: index == 1 ? normalize(26) : normalize(30),
                            left: index == 1 ? 0 : -3,
                            marginRight: normalize(10),
                          }}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: normalize(12),
                          color: Colors.black,
                          fontFamily: Fonts.Poppins_Regular,
                        }}>
                        {type == 'state' ? item : item.name}
                      </Text>
                    </View>
                    {type == 'country_code' && (
                      <Text
                        style={{
                          fontSize: normalize(12),
                          color: Colors.black,
                          fontFamily: Fonts.Poppins_Regular,
                        }}>
                        {item.code}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <View>
                  <LottieView
                    source={require('../../../assets/json/no_data_availble.json')}
                    autoPlay
                    loop
                    style={{
                      height: normalize(220),
                      width: normalize(220),
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
                    No Province Found
                  </Text>
                </View>
              }
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
  subcon: {width: width * 0.9, alignSelf: 'center'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: normalize(16),
    width: width * 0.9,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: normalize(35),
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(14),
    color: Colors.black,
    paddingHorizontal: normalize(5),
  },
  title1: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(14),
    color: Colors.black,
    paddingHorizontal: normalize(5),
    width: '90%',
  },
  title: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(10),
    color: Colors.subtext,
  },
  errortxt: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Medium,
    alignSelf: 'flex-end',
    color: 'red',
    position: 'absolute',
    top: normalize(38),
  },
  touch: {
    paddingHorizontal: normalize(5),
    height: normalize(35),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  country: {
    color: 'black',
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Regular,
  },
  img: {
    height: normalize(10),
    width: normalize(10),
    resizeMode: 'contain',
    tintColor: 'gray',
    marginLeft: normalize(5),
  },
  mainContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  touch1: {
    width: '90%',
    alignSelf: 'center',
    height: normalize(45),
    borderBlockColor: Colors.border,
    borderBottomWidth: normalize(1),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(10),
  },
});
