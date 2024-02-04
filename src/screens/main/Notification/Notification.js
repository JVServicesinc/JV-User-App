import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../themes/Colors';
import Header from '../../../components/Header';
import {Icons} from '../../../themes/Icons';
import normalize from '../../../utils/helpers/normalize';
import {Fonts} from '../../../themes/Fonts';

const Notification = () => {
  return (
    <SafeAreaView style={styles.primary}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={{
        paddingHorizontal: normalize(18)
      }}>
      <Header title={'Notification'} />
      </View>

      <FlatList
        data={Array(2)}
        contentContainerStyle={{
          paddingHorizontal: normalize(18)
        }}
        renderItem={() => {
          return (
            <>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.editback}>
                  <Image source={Icons.Notice} style={styles.img} />
                </View>
                <View style={{width: Dimensions.get('window').width * 0.7}}>
                  <Text style={styles.text}>Refer & Earn more</Text>
                  <Text style={{...styles.Subtext, color: Colors.subtext}}>
                    New notification here dummy info, more dummy info here dummy
                    info here.
                  </Text>
                  <Text style={{...styles.Subtext, color: Colors.black}}>
                    Thu 21 Apr
                  </Text>
                </View>
              </View>

              <View style={styles.line} />
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  img: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
  editback: {
    backgroundColor: Colors.gray,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(14),
  },
  text: {
    color: Colors.black,
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
  },
  Subtext: {
    color: Colors.subtext,
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
  },
  line: {
    height: normalize(1.2),
    backgroundColor: Colors.line,
    width: Dimensions.get('window').width * 0.85,
    marginTop: normalize(10),
    marginBottom: normalize(14),
  },
});
