import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  useColorScheme,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from '../../utils/helpers/normalize';
import {Icons} from '../../themes/Icons';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import {Fonts} from '../../themes/Fonts';
import {loginRequest} from '../../redux/reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import isInternetConnected from '../../utils/helpers/NetInfo';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setIsFetching} from '../../redux/reducer/GlobalSlice';

const Login = ({route}) => {
  const _email = route?.params?.email;

  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [errmsg, setErrMsg] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (_email) {
      setEmail(_email);
    }
    // console.log('Langauge --- ', i18n.language);
    // setTimeout(() => {
    //   // frCA
    //   i18n.changeLanguage('frCA');
    // }, 4000);
  }, [_email]);

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = async () => {
    if (email.trim() == '') {
      setEmailError(true);
      setErrMsg(t('empty_email'));
    } else if (!regex.test(email)) {
      setEmailError(true);
      setErrMsg(t('enter_valid_email'));
    } else if (password.trim() == '') {
      setPassError(true);
      setErrMsg(t('empty_password'));
    } else if (password.length < 8) {
      setPassError(true);
      setErrMsg(t('minmum_enter_password'));
    } else {
      let fromdata = new FormData();
      fromdata.append('username', email.toLocaleLowerCase().trim());
      fromdata.append('password', password);
      await login(fromdata);
    }
  };

  async function login(obj) {
    isInternetConnected()
      .then(() => {
        dispatch(loginRequest(obj));
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={'#191919'} barStyle={'light-content'} />

        <Loader visible={AuthReducer.status == 'Auth/loginRequest'} />
        <View style={styles.bg}>
          <Image source={Icons.Applogo} style={styles.img} />
        </View>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <KeyboardAwareScrollView>
          <View style={styles.main}>
            <Animatable.View
              animation={'fadeInUp'}
              duration={800}
              delay={300}
              style={styles.container}>
              <View style={styles.card}>
                <Text style={styles.h1}>{t('login')}</Text>
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
                        placeholder={t('email_address')}
                        placeholderTextColor={'gray'}
                        onChangeText={text => {
                          setEmailError(false), setEmail(text);
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

                  <View style={styles.subcon}>
                    <View
                      style={{
                        ...styles.inputContainer,
                        borderColor: passError ? 'red' : '#ccc',
                      }}>
                      <Image source={Icons.Lock} style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('password')}
                        placeholderTextColor={'gray'}
                        secureTextEntry={isVisible}
                        value={password}
                        onChangeText={text => {
                          setPassError(false), setPassword(text);
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setIsVisible(!isVisible)}
                        style={{
                          height: normalize(30),
                          width: normalize(30),
                          marginLeft: normalize(5),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={isVisible ? Icons.visible : Icons.invisible}
                          style={{
                            resizeMode: 'contain',
                            height: normalize(16),
                            width: normalize(16),
                            tintColor: 'gray',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        ...styles.errortxt,
                        display: passError ? 'flex' : 'none',
                      }}>
                      {errmsg}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: normalize(18),
                      paddingBottom: normalize(5),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Regular,
                        fontSize: normalize(11),
                        color: '#161616',
                      }}>
                      {t('forgot_password')}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.btn}>
                    <TouchableOpacity
                      onPress={() => handleLogin()}
                      style={styles.button}>
                      <Image source={Icons.RightArrow} style={styles.arrow} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.btm}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {t('no_account')}
                    <Text
                      onPress={() => navigation.navigate('Signup')}
                      style={{color: '#161616', fontWeight: 'bold'}}>
                      {' '}
                      {t('signup')}
                    </Text>
                  </Text>
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

export default Login;

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
    fontFamily: Fonts.Poppins_Medium,
    alignSelf: 'flex-end',
    color: 'red',
    position: 'absolute',
    top: normalize(38),
  },
  subcon: {width: width * 0.7, alignSelf: 'center'},
});
