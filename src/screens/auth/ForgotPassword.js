import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from '../../utils/helpers/normalize';
import {Icons} from '../../themes/Icons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
const {width, height} = Dimensions.get('window');
import {Fonts} from '../../themes/Fonts';
import {Colors} from '../../themes/Colors';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import isInternetConnected from '../../utils/helpers/NetInfo';
import {forgotPasswordRequest} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

const ForgotPassword = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [errmsg, setErrMsg] = useState('');
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignup = async () => {
    if (email.trim() == '') {
      setEmailError(true);
      setErrMsg(t('empty_email'));
    } else if (!regex.test(email)) {
      setEmailError(true);
      setErrMsg(t('enter_valid_email'));
    } else {
      let fromdata = new FormData();
      fromdata.append('email', email.toLocaleLowerCase().trim());
      forgotPasswordSend(fromdata);
    }
  };

  function forgotPasswordSend(obj) {
    isInternetConnected()
      .then(() => {
        dispatch(
          forgotPasswordRequest({
            data: obj,
            type: 'request',
          }),
        );
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }

  useEffect(() => {
    if (isFocused) {
      setEmail('');
    }
  }, [isFocused]);

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/forgotPasswordRequest'} />
      <View>
        <StatusBar backgroundColor={'#191919'} barStyle={'light-content'} />

        <View style={styles.bg}>
          <Image source={Icons.Applogo} style={styles.img} />
        </View>

        {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
        <KeyboardAwareScrollView>
          <View style={styles.main}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.touch}>
              <Image source={Icons.BackArrow} style={styles.backImg} />
            </TouchableOpacity>
            <Animatable.View
              animation={'fadeInUp'}
              duration={800}
              delay={300}
              style={styles.container}>
              <View style={styles.card}>
                <Text style={styles.h1}>{t('forgotPassword')}</Text>

                <View style={styles.middle}>
                  <View style={styles.subcon}>
                    <View
                      style={{
                        ...styles.inputContainer,
                        borderColor: emailError ? 'red' : '#ccc',
                      }}>
                      <Image source={Icons.Email} style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        placeholderTextColor={'gray'}
                        onChangeText={text => {
                          setEmailError(false);
                          setEmail(text);
                        }}
                        value={email}
                        keyboardType="email-address"
                      />
                    </View>
                    <Text
                      style={{
                        ...styles.errortxt,
                        display: emailError ? 'flex' : 'none',
                      }}>
                      {errmsg}
                    </Text>
                  </View>

                  <View style={styles.btn}>
                    <TouchableOpacity
                      onPress={() => handleSignup()}
                      style={styles.button}>
                      <Image source={Icons.RightArrow} style={styles.arrow} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animatable.View>
          </View>
        </KeyboardAwareScrollView>
        {/* </ScrollView> */}
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#191919',
    position: 'absolute',
    width: width,
    height: height * 0.6,
    borderBottomLeftRadius: normalize(30),
    borderBottomRightRadius: normalize(30),
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: normalize(16),
    width: width * 0.7,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: normalize(35),
    paddingLeft: 10,
    color: 'black',
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Regular,
  },
  icon: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
    tintColor: 'gray',
    marginRight: normalize(5),
  },
  arrow: {
    height: normalize(14),
    width: normalize(16),
    resizeMode: 'contain',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: normalize(15),
  },
  container: {
    width: width * 0.8,
    marginTop: width * 0.8,
  },
  card: {
    paddingVertical: normalize(20),
    backgroundColor: '#fff',
    borderRadius: normalize(15),
  },
  h1: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: normalize(15),
    lineHeight: normalize(24),
  },
  h2: {
    marginTop: 5,
    fontSize: 20,
  },
  middle: {
    marginTop: 30,
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(8),
  },
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#040404',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btm: {
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  img: {
    height: normalize(142),
    width: normalize(142),
    resizeMode: 'contain',
    marginTop: normalize(60),
  },
  errortxt: {
    fontSize: normalize(10),
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: 'red',
    position: 'absolute',
    top: normalize(38),
  },
  subcon: {width: width * 0.7, alignSelf: 'center'},
  mainContainer: {
    backgroundColor: Colors.white,
    height: '30%',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  touch: {
    height: normalize(45),
    width: normalize(45),
    position: 'absolute',
    top: Platform.OS == 'android' ? normalize(20) : normalize(45),
    left: normalize(2),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  backImg: {
    resizeMode: 'contain',
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.white,
  },
});
