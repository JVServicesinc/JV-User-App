import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
import {Images} from '../../../themes/Images';
import {Fonts} from '../../../themes/Fonts';
import {Icons} from '../../../themes/Icons';

const ServiceRating = ({navigation}) => {
  const [review, setReview] = useState('');
  const [select, setSelect] = useState(0);
  const RATE = ['Terrible', 'Bad', 'Meh', 'OK', 'Good'];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
            paddingVertical: normalize(12),
            alignItems: 'center',
          }}
          style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: Platform.OS == 'android' ? normalize(10) : 0,
            }}>
            <Text
              style={{
                color: '#161616',
                fontFamily: Fonts.Poppins_SemiBold,
                fontSize: normalize(18),
              }}>
              Feedback
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                height: normalize(30),
                width: normalize(30),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: normalize(15),
              }}>
              <Image
                style={{
                  height: normalize(20),
                  width: normalize(18),
                  resizeMode: 'contain',
                }}
                source={Icons.close2}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Image source={Images.ac_service} style={styles.img} />
            <View style={{marginLeft: normalize(16)}}>
              <Text style={styles.heading11}>AC Service</Text>
              <Text style={styles.subtest12}>• 1 hrs</Text>
              <Text style={styles.subtest12}>• Includes dummy info</Text>
            </View>
          </View>
          <Text
            style={{
              color: '#161616',
              fontSize: normalize(13),
              fontFamily: Fonts.Poppins_Regular,
              marginTop: normalize(15),
              textAlign: 'center',
            }}>
            {'How would you rate the experience\nand service ?'}
          </Text>

          <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
            {[0, 1, 2, 3, 4].map((item, index) => {
              return (
                <TouchableOpacity onPress={() => setSelect(index)}>
                  <Image
                    source={select < index ? Icons.BlankStar : Icons.star}
                    style={{
                      height: normalize(18),
                      width: normalize(18),
                      resizeMode: 'contain',
                      marginHorizontal: normalize(3),
                      tintColor: select < index ? '#757575' : '#F5C443',
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text
            style={{
              color: '#161616',
              fontFamily: Fonts.Poppins_Regular,
              fontSize: normalize(11),
              marginTop: normalize(5),
            }}>
            {RATE[select]}
          </Text>

          <View
            style={{
              backgroundColor: '#F3F3F3',
              height: normalize(150),
              width: '90%',
              borderRadius: normalize(10),
              alignSelf: 'center',
              marginTop: normalize(130),
              // position: 'absolute',
              // bottom: normalize(100),
              // padding: normalize(5),
            }}>
            <TextInput
              value={review}
              onChangeText={txt => setReview(txt)}
              maxLength={200}
              multiline={true}
              placeholder="Tell us on how we can improve"
              placeholderTextColor={'#ABABAB'}
              textAlignVertical="top"
              style={{
                height: '100%',
                width: '100%',
                padding: normalize(10),
                color: Colors.black,
                fontFamily: Fonts.Poppins_Medium,
                fontSize: normalize(12),
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity
        disabled={review == '' ? true : false}
        //   onPress={() => setIsVisible1(true)}
        style={{
          backgroundColor: review !== '' ? 'black' : '#D8D8D8',
          height: normalize(42),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: normalize(10),
          marginTop: normalize(16),
          position: 'absolute',
          bottom: normalize(40),
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: review !== '' ? 'white' : '#858585',
            fontSize: normalize(14),
            fontFamily: Fonts.Poppins_Medium,
          }}>
          Submit Feedback
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ServiceRating;

const styles = StyleSheet.create({
  card: {
    padding: normalize(14),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: normalize(20),
  },
  img: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: 'contain',
    borderRadius: normalize(10),
  },
  heading11: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  heading12: {
    fontSize: normalize(11),
    color: '#757575',
    fontFamily: Fonts.Poppins_Regular,
  },
  card1: {
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(16),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(12),
    width: '90%',
    alignSelf: 'center',
  },
  img1: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: 'contain',
  },
  heading111: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  heading121: {
    fontSize: normalize(11),
    color: '#757575',
    fontFamily: Fonts.Poppins_Regular,
  },
});
