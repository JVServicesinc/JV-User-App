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
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../themes/Images';
import {Icons} from '../../../themes/Icons';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getImageFromCamera,
  getImageFromGallery,
} from '../../../utils/helpers/halper';
import Picker from '../../../components/Picker';
import {updateUserInfoRequest} from '../../../redux/reducer/UserReducer';
import showErrorAlert from '../../../utils/helpers/Toast';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import Loader from '../../../utils/helpers/Loader';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const userInfo = UserReducer?.userInfo;

  const [email, setEmail] = useState(userInfo?.email);
  const [name, setName] = useState(userInfo?.full_name);
  const [phone, setPhone] = useState(userInfo?.mobile);
  const [edit, setEdit] = useState(false);
  const [errmsg, setErrMsg] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [errind, setErrInd] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(userInfo?.user_profile_image || '');
  const [imagePath, setImagePath] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const fullNameRegex = /^[A-Za-z\s'-]+$/;

  const save = async () => {
    if (name.trim() == '') {
      setErrInd(1);
      setErrMsg('Please enter your name');
    } else if (!fullNameRegex.test(name) || name.length <= 3) {
      setErrInd(1);
      setErrMsg('Invalid full name.');

      // } else if (email.trim() == '') {
      //   setErrInd(2);
      //   setErrMsg('Please enter a email address');
      // } else if (!regex.test(email)) {
      //   setErrInd(2);
      //   setErrMsg('Please enter a vaild email address');
      // } else if (phone.trim() == '') {
      //   setErrInd(3);
      //   setErrMsg('Please enter your phone number');
      // } else if (phone.length < 8) {
      //   setErrInd(3);
      //   setErrMsg('Please enter a vaild phone number');
    } else {
      // navigation.navigate('BottomTab');
      setErrInd(0);

      let fromdata = new FormData();
      if (typeof imagePath !== 'string' && imagePath?.uri && imagePath?.type) {
        fromdata.append('user_image', {
          uri:
            Platform.OS === 'ios'
              ? `file:///${imagePath?.uri}`
              : imagePath?.uri,
          type: imagePath?.type,
          name: `${moment()}.jpeg`,
        });
        console.log("Picture!")
      }
      fromdata.append('full_name', name);

      update(fromdata);
    }
  };

  useEffect(() => {
    if (name !== '') {
      //email !== '' || phone !== '' ||
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [name, email, phone]);

  function update(obj) {
    isInternetConnected()
      .then(() => {
        dispatch(updateUserInfoRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please Connect To Internet');
      });
  }

  const countryList = [
    {
      flag: Icons.india,
      code: '+91',
    },
    {
      flag: Icons.canada,
      code: '+1',
    },
  ];

  return (
    <SafeAreaView style={styles.primary}>
      <Loader visible={UserReducer.status == 'User/updateUserInfoRequest'} />
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <Header title={'Edit Profile'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          <View style={styles.imgback}>
            <Image
              source={imageUrl !== '' ? {uri: imageUrl} : Images.Avatar}
              style={styles.img}
            />
            <TouchableOpacity
              onPress={() => setIsOptionsVisible(true)}
              style={styles.editV}>
              <Image source={Icons.camera} style={styles.camera} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Full Name</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setName(text);
                }}
                value={name}
                keyboardType="default"
              />
            </View>
            <Text
              style={{
                ...styles.errortxt,
                display: errind == 1 ? 'flex' : 'none',
              }}>
              {errmsg}
            </Text>
          </View>
          <Text style={styles.title}>Email</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: Colors.deactive,
              }}>
              <TextInput
                editable={false}
                style={styles.input}
                onChangeText={text => {
                  setEmail(text);
                }}
                value={email}
                keyboardType="email-address"
              />
            </View>
            <Text
              style={{
                ...styles.errortxt,
                display: errind == 2 ? 'flex' : 'none',
              }}>
              {errmsg}
            </Text>
          </View>
          <Text style={styles.title}>Mobile Number</Text>
          <View style={styles.subcon}>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: Colors.deactive,
              }}>
              <TouchableOpacity
                disabled={true}
                onPress={() => setIsVisible(true)}
                style={{
                  paddingHorizontal: normalize(5),
                  height: normalize(35),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  {countryCode}
                </Text>
                <Image
                  source={Icons.down_arrow}
                  style={{
                    height: normalize(10),
                    width: normalize(10),
                    resizeMode: 'contain',
                    tintColor: 'gray',
                    marginLeft: normalize(5),
                  }}
                />
              </TouchableOpacity>
              <TextInput
                editable={false}
                style={styles.input}
                onChangeText={text => {
                  setPhone(text);
                }}
                value={phone}
                keyboardType="numeric"
              />
            </View>
            <Text
              style={{
                ...styles.errortxt,
                display: errind == 3 ? 'flex' : 'none',
              }}>
              {errmsg}
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: normalize(15),
            alignSelf: 'center',
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
            onPress={() => save()}>
            <Text style={{color: edit ? 'white' : '#858585', fontSize: 16}}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Upload Options */}
        <Picker
          children={
            <View style={styles.options}>
              <Text style={styles.title1}>Profile Photo</Text>
              <TouchableOpacity
                onPress={() =>
                  getImageFromGallery(res => {
                    setIsOptionsVisible(false);
                    setImageUrl(res?.uri);
                    setImagePath(res?.path);
                  })
                }
                style={styles.touch}>
                <Text style={styles.btnTitle}>Upload from your phone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  getImageFromCamera(true, res => {
                    setIsOptionsVisible(false);
                    setImageUrl(res?.uri);
                    setImagePath(res?.path);
                  })
                }
                style={[
                  styles.touch,
                  {
                    backgroundColor: Colors.card_text,
                  },
                ]}>
                <Text style={styles.btnTitle}>Take a picture</Text>
              </TouchableOpacity>
            </View>
          }
          isTabLine={true}
          isVisible={isOptionsVisible}
          setIsVisible={() => setIsOptionsVisible(false)}
          height={'35%'}
        />

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
          onBackButtonPress={() => setIsVisible(false)}
          onBackdropPress={() => setIsVisible(false)}>
          <View style={styles.mainContainer}>
            <FlatList
              data={countryList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCountryCode(item.code);
                      setIsVisible(false);
                    }}
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      height: normalize(45),
                      borderBlockColor: Colors.border,
                      borderBottomWidth: normalize(1),
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: normalize(10),
                    }}>
                    <Image
                      source={item.flag}
                      style={{
                        resizeMode: 'contain',
                        height: normalize(30),
                        width: index == 1 ? normalize(26) : normalize(30),
                        left: index == 1 ? 0 : -3,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: Colors.black,
                        fontFamily: Fonts.Poppins_Regular,
                      }}>
                      {item.code}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
  camera: {
    height: normalize(15),
    width: normalize(15),
    resizeMode: 'contain',
  },
  imgback: {
    backgroundColor: Colors.yellow,
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: normalize(50),
    // padding: normalize(4),
  },
  editV: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -normalize(5),
    right: -normalize(5),
    height: normalize(26),
    width: normalize(26),
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.4)',
    elevation: 5,
    shadowOffset: {
      height: 0,
      width: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: normalize(100),
    resizeMode: 'contain',
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
  icon: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
    tintColor: 'gray',
    marginRight: normalize(5),
  },
  input: {
    flex: 1,
    height: normalize(35),
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(14),
    color: Colors.black,
    paddingHorizontal: normalize(5),
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
  options: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: normalize(20),
  },
  title1: {
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
    marginBottom: normalize(25),
    fontSize: normalize(18),
  },
  btnTitle: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white,
    fontSize: normalize(14),
  },
  touch: {
    backgroundColor: Colors.black,
    height: normalize(43),
    alignSelf: 'center',
    borderRadius: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(15),
    width: '100%',
  },
});
