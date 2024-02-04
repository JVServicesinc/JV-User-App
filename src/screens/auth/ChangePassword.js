import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from '../../utils/helpers/normalize';
import {Icons} from '../../themes/Icons';
import * as Animatable from 'react-native-animatable';
const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {signupRequest} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import isInternetConnected from '../../utils/helpers/NetInfo';
import {Fonts} from '../../themes/Fonts';
import {Colors} from '../../themes/Colors';
import Loader from '../../utils/helpers/Loader';
import {fromToObj} from '../../utils/helpers/halper';
import {updatePasswordRequest} from '../../redux/reducer/UserReducer';
import {useTranslation} from 'react-i18next';

const ChangePassword = ({route, navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const {data} = route?.params;
  const details = fromToObj(data);

  const [password, setPassword] = useState('');
  const [errmsg, setErrMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cErrMsg, setCErrMsg] = useState('');

  const submit = async data => {
    if (password.trim() == '') {
      setErrMsg(t('empty_password'));
    } else if (password.length < 8) {
      setErrMsg(t('minmum_enter_password'));
    } else if (confirmPassword.trim() == '') {
      setCErrMsg(t('confirm_password'));
    } else if (confirmPassword !== password) {
      setCErrMsg(t('match_confirm_password'));
    } else {
      setErrMsg('');
      setCErrMsg('');
      let fromdata = new FormData();
      fromdata.append('email', data?.email);
      fromdata.append('password', password);

      callAPi(fromdata);
    }
  };

  function callAPi(obj) {
    isInternetConnected()
      .then(() => {
        dispatch(updatePasswordRequest(obj));
      })
      .catch(err => {
        showErrorAlert(t('no_internet'));
      });
  }

  useEffect(() => {
    if (UserReducer.status == 'User/updatePasswordSuccess') {
      navigation.replace('Login');
    }
  }, [UserReducer]);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#191919'} barStyle={'light-content'} />
      <Loader visible={UserReducer.status == 'User/updatePasswordRequest'} />
      <View style={styles.bg}>
        <Image source={Icons.Applogo} style={styles.img} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => navigation.replace('Login')}
            style={styles.touch}>
            <Image source={Icons.BackArrow} style={styles.backImg} />
          </TouchableOpacity>
          <Animatable.View
            animation={'fadeInUp'}
            duration={800}
            delay={300}
            style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.h1}>{t('change_password')}</Text>

              <View style={styles.middle}>
                <View style={styles.subcon}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      borderColor: errmsg !== '' ? 'red' : '#ccc',
                    }}>
                    <Image source={Icons.Lock} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder="New Password"
                      placeholderTextColor={'gray'}
                      secureTextEntry
                      value={password}
                      onChangeText={text => {
                        setErrMsg('');
                        setPassword(text);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.errortxt,
                      display: errmsg !== '' ? 'flex' : 'none',
                    }}>
                    {errmsg}
                  </Text>
                </View>

                <View style={styles.subcon}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      borderColor: cErrMsg !== '' ? 'red' : '#ccc',
                    }}>
                    <Image source={Icons.Lock} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder={t('confirmPassword')}
                      placeholderTextColor={'gray'}
                      secureTextEntry
                      value={confirmPassword}
                      onChangeText={text => {
                        setCErrMsg('');
                        setConfirmPassword(text);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.errortxt,
                      display: cErrMsg !== '' ? 'flex' : 'none',
                    }}>
                    {cErrMsg}
                  </Text>
                </View>
                <View style={styles.btn}>
                  <TouchableOpacity
                    onPress={() => submit(details)}
                    style={styles.button}>
                    <Image source={Icons.RightArrow} style={styles.arrow} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

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
});
