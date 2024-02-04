import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';

import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';
import Picker from '../../../components/Picker';

const CancelBooking = () => {
  const navigation = useNavigation();
  const [msg, setMsg] = useState('');
  const [selectIndex, setSelectIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const datatext = [
    {
      title: 'A reason here for cancellation of booking',
    },
    {
      title:
        'A reason here for cancellation of booking, a\nreason here for cancellation of booking  ',
    },
    {
      title: 'A reason here for cancellation of booking',
    },
    {
      title:
        'A reason here for cancellation of booking, a \nreason here forcancellation of booking',
    },
  ];
  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          marginHorizontal: normalize(15),
        }}>
        <Header title={'Cancel Booking'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image source={Icons.testone} style={styles.img} />
          <View style={{marginLeft: normalize(16)}}>
            <Text style={styles.heading12}>Diamond Facial</Text>
            <Text style={styles.subtest12}>• 2 hrs</Text>
            <Text style={styles.subtest12}>• Includes dummy info</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors.gray,
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(18),
            marginTop: normalize(20),
          }}>
          <Text
            style={{
              fontSize: normalize(10),
              color: Colors.subtext,
              fontFamily: Fonts.Poppins_Bold,
              textTransform: 'uppercase',
            }}>
            reason for cancellation
          </Text>
        </View>

        <View
          style={{marginHorizontal: normalize(18), marginTop: normalize(6)}}>
          <FlatList
            data={datatext}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (selectIndex == index + 1) {
                      setSelectIndex(0);
                    } else {
                      setSelectIndex(index + 1);
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(8),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectIndex == index + 1) {
                        setSelectIndex(0);
                      } else {
                        setSelectIndex(index + 1);
                      }
                    }}
                    style={{
                      width: normalize(22),
                      position: 'absolute',
                      left: 0,
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        borderColor:
                          selectIndex == index + 1 ? '#5E17EB' : '#161616',
                        borderWidth: normalize(1),
                        height: normalize(14),
                        width: normalize(14),
                        borderRadius: normalize(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {selectIndex == index + 1 && (
                        <View
                          style={{
                            backgroundColor: '#5E17EB',
                            height: normalize(8),
                            width: normalize(8),
                            borderRadius: normalize(15),
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      color: '#161616',
                      fontSize: normalize(10.5),
                      marginLeft: normalize(22),
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.gray,
            borderRadius: normalize(10),
            marginVertical: normalize(15),
            marginHorizontal: normalize(15),
          }}>
          <TextInput
            style={{
              height: normalize(115),
              borderRadius: normalize(10),
              paddingHorizontal: normalize(12),
              paddingTop: normalize(5),
              textAlignVertical: 'top',
              fontSize: normalize(10),
              color: Colors.black,
              fontFamily: Fonts.Poppins_Regular,
              width: '100%',
            }}
            maxLength={250}
            placeholderTextColor={'grey'}
            onChangeText={val => setMsg(val)}
            value={msg}
            multiline={true}
            placeholder={`or comment here. . .`}
          />
        </View>
      </ScrollView>

      <View
        style={{
          ...styles.container,
        }}>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={{
            ...styles.btn,
            height: normalize(42),
            backgroundColor:
              selectIndex !== 0 && msg !== '' ? 'black' : '#D8D8D8',
          }}>
          <Text
            style={{
              ...styles.btntext,
              color: selectIndex !== 0 && msg !== '' ? 'white' : '#858585',
            }}>
            Cancel Now
          </Text>
        </TouchableOpacity>
      </View>

      <Picker
        children={
          <View>
            <Image
              style={{
                height: normalize(45),
                width: normalize(45),
                resizeMode: 'contain',
                marginTop: normalize(18),
                alignSelf: 'center',
              }}
              source={Icons.sad}
            />
            <Text
              style={{
                color: Colors.black,
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Regular,
                marginTop: normalize(14),
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {'Are you sure about cancelling\nthis booking ?'}
            </Text>

            <Text
              style={{
                color: Colors.black,
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Regular,
                marginTop: normalize(6),
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {'You can always '}
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                reshedule it.
              </Text>
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                marginHorizontal: normalize(15),
                paddingTop: normalize(30),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    navigation.navigate('Home');
                  }, 500);
                }}
                style={{
                  backgroundColor: Colors.deactive,
                  width: normalize(135),
                  height: normalize(42),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: normalize(6),
                }}>
                <Text style={{...styles.btntext, color: Colors.black}}>
                  Cancel anyway
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    navigation.navigate('RescheduleBooking');
                  }, 500);
                }}
                style={{
                  backgroundColor: Colors.black,
                  width: normalize(135),
                  height: normalize(42),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: normalize(6),
                }}>
                <Text style={{...styles.btntext, color: Colors.white}}>
                  Reshedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        isTabLine={true}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        height={'38%'}
      />
    </SafeAreaView>
  );
};

export default CancelBooking;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
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
    fontSize: normalize(10.5),
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
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(14),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(14),
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
    bottom: normalize(35),
    alignSelf: 'center',
  },
  btn: {
    width: Dimensions.get('window').width * 0.9,
    paddingVertical: normalize(8),
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
