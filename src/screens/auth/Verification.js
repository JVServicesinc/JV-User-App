import {
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/normalize';
import {Fonts} from '../../themes/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fromToObj} from '../../utils/helpers/halper';
import showErrorAlert from '../../utils/helpers/Toast';
import isInternetConnected from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {
  checkValidforgotPassRequest,
  forgotPasswordRequest,
  otpVerifyRequest,
  resendOtpRequest,
} from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import OTPHInput from '../../components/OTPHInput';
import {Icons} from '../../themes/Icons';

const Verification = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {data, type} = route?.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [pin, setPin] = useState('');
  const [details, setDetails] = useState(fromToObj(data));

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  function otpVerity(obj, details, type) {
    isInternetConnected()
      .then(() => {
        if (type == '') {
          dispatch(
            otpVerifyRequest({
              data: obj,
              obj: details,
            }),
          );
        } else {
          dispatch(checkValidforgotPassRequest(obj));
        }
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }

  function resendOtp(obj, type) {
    isInternetConnected()
      .then(() => {
        if (type == '') {
          dispatch(resendOtpRequest(obj));
        } else {
          dispatch(
            forgotPasswordRequest({
              data: obj,
              type: '',
            }),
          );
        }
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }

  useEffect(() => {
    if (
      isFocused &&
      AuthReducer.status == 'Auth/loginFailure' &&
      !_.isEmpty(details) &&
      type == ''
    ) {
      let fromdata = new FormData();
      fromdata.append(
        'email',
        details?.email ? details?.email : details?.username,
      );
      resendOtp(fromdata, type);
    }
  }, [isFocused, AuthReducer, details, type]);

  useEffect(() => {
    let pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
    setPin(pin);
  }, [pin1, pin2, pin3, pin4, pin5, pin6]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Loader
        visible={
          AuthReducer.status == 'Auth/otpVerifyRequest' ||
          AuthReducer.status == 'Auth/resendOtpRequest' ||
          AuthReducer.status == 'Auth/loginRequest' ||
          AuthReducer.status == 'Auth/forgotPasswordRequest' ||
          AuthReducer.status == 'Auth/checkValidforgotPassRequest'
        }
      />
      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 0}
        enableOnAndroid={true}
        style={{
          flex: 1,
        }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backTouch}>
            <Image source={Icons.BackArrow} style={styles.backImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('verification')}</Text>
        </View>

        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            marginTop: normalize(50),
          }}>
          <Text style={styles.confirmText}>{t('confirmation')}</Text>
          <Text
            style={{
              color: '#000',
              fontSize: normalize(13),
              fontFamily: Fonts.Poppins_Regular,
              marginTop: normalize(20),
              textAlign: 'center',
              width: '80%',
              alignSelf: 'center',
            }}>
            {t('sent_otp_des')}{' '}
            {details?.email ? details?.email : details?.username}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              shadowColor: 'rgba(195, 195, 195, 0.9)',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: normalize(30),
            }}>
            <TextInput
              style={[
                styles.otpContainer,
                {
                  //   backgroundColor: pin1.length >= 1 ? 'black' : 'grey',
                },
              ]}
              ref={inputRef1}
              value={pin1}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin1(val);
                if (!pin1.length >= 1) {
                  inputRef2.current.focus();
                }
              }}
            />
            <TextInput
              style={[
                styles.otpContainer,
                {
                  //   backgroundColor: pin2.length >= 1 ? 'black' : 'grey',
                },
              ]}
              ref={inputRef2}
              value={pin2}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin2(val);
                if (!pin2.length >= 1) {
                  inputRef3.current.focus();
                } else if (!pin2.length < 1) {
                  inputRef1.current.focus();
                }
              }}
            />
            <TextInput
              style={[
                styles.otpContainer,
                {
                  //   backgroundColor: pin3.length >= 1 ? 'black' : 'grey',
                },
              ]}
              ref={inputRef3}
              value={pin3}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin3(val);
                if (!pin3.length >= 1) {
                  inputRef4.current.focus();
                } else if (!pin3.length < 1) {
                  inputRef2.current.focus();
                }
              }}
            />
            <TextInput
              style={[
                styles.otpContainer,
                {
                  //   backgroundColor: pin4.length >= 1 ? 'black' : 'grey',
                },
              ]}
              ref={inputRef4}
              value={pin4}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin4(val);
                if (!pin4.length >= 1) {
                  inputRef5.current.focus();
                } else if (!pin4.length < 1) {
                  inputRef3.current.focus();
                }
              }}
            />

            <TextInput
              style={[
                styles.otpContainer,
                {
                  //   backgroundColor: pin4.length >= 1 ? 'black' : 'grey',
                },
              ]}
              ref={inputRef5}
              value={pin5}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin5(val);
                if (!pin5.length >= 1) {
                  inputRef6.current.focus();
                } else if (!pin5.length < 1) {
                  inputRef4.current.focus();
                }
              }}
            />

            <TextInput
              style={[
                styles.otpContainer,
                {
                  //   backgroundColor: pin4.length >= 1 ? 'black' : 'grey',
                },
              ]}
              ref={inputRef6}
              value={pin6}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={val => {
                setPin6(val);
                if (!pin6.length >= 1) {
                  inputRef6.current.focus();
                } else if (!pin6.length < 1) {
                  inputRef5.current.focus();
                }
              }}
            />
          </View>
          <TouchableOpacity
            disabled={pin.length !== 6}
            style={[
              styles.confirm,
              {
                backgroundColor:
                  pin.length !== 6
                    ? 'rgba(225,225,225,0.5)'
                    : Colors.tealish_green,
              },
            ]}
            onPress={() => {
              let fromdata = new FormData();
              fromdata.append(
                'email',
                details?.email ? details?.email : details?.username,
              );
              fromdata.append('otp', pin);

              otpVerity(fromdata, details, type);
            }}>
            <Text style={styles.loading}>{t('verify')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resend}
            onPress={() => {
              let fromdata = new FormData();
              fromdata.append(
                'email',
                details?.email ? details?.email : details?.username,
              );
              resendOtp(fromdata, type);
              setPin('');
              setPin1('');
              setPin2('');
              setPin3('');
              setPin4('');
              setPin5('');
              setPin6('');
              inputRef1.current.focus();
            }}>
            <Text style={styles.resendfText}>{t('resend_code')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '102%',
    alignSelf: 'center',
    zIndex: 1,
  },
  confirmText: {
    color: '#000',
    fontSize: normalize(16),
    fontFamily: Fonts.Poppins_Medium,
    textTransform: 'uppercase',
    marginLeft: normalize(15),
    textAlign: 'center',
  },
  resendfText: {
    color: '#2B95E9',
    fontSize: normalize(12),
    // textTransform: 'uppercase',
    fontFamily: Fonts.Poppins_Regular,
  },
  resend: {
    alignSelf: 'center',
    marginTop: normalize(10),
    height: normalize(35),
    justifyContent: 'center',
  },
  confirm: {
    marginTop: normalize(20),
    height: normalize(42),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: normalize(8),
    width: '70%',
    alignSelf: 'center',
  },
  loading: {
    color: 'white',
    fontSize: normalize(18),
    textTransform: 'uppercase',
    fontFamily: Fonts.Poppins_Medium,
  },
  headerContainer: {
    height: normalize(55),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(15),
  },
  backTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: normalize(50),
    position: 'absolute',
    left: 0,
  },
  backImg: {
    resizeMode: 'contain',
    width: normalize(15),
    height: normalize(15),
    marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(20),
  },
  headerTitle: {
    color: '#000113',
    fontSize: normalize(24),
    fontFamily: Fonts.Poppins_SemiBold,
    marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(20),
    textAlign: 'center',
    marginLeft: normalize(15),
  },
  otpContainer: {
    borderRadius: normalize(4),
    height: normalize(55),
    width: normalize(45),
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(2.5),
    textAlign: 'center',
    fontSize: normalize(20),
    fontFamily: Fonts.Poppins_SemiBold,
    color: 'black',
  },
});
