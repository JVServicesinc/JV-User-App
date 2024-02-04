import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {memo, useState} from 'react';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Colors} from '../../../themes/Colors';
import {Images} from '../../../themes/Images';
import {Icons} from '../../../themes/Icons';

const Chat = ({navigation}) => {
  const [message, setMessage] = useState('');

  const CHAT = [
    {
      message: 'Hey Harry, I am having issue in finding your address',
      time: 'Today 09:37 am',
      type: 'sender',
    },
    {
      message: 'Are you near the extension gate ?',
      time: 'Today 09:39 am',
      type: 'receiver',
    },
  ];

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.hc}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.tc}>
          <Image source={Icons.BackArrow} style={styles.bi} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Platform.OS == 'android' ? normalize(5) : 0,
          }}>
          <Text style={styles.name}>Jim Carrey</Text>
          <View style={styles.status} />
        </View>
        <TouchableOpacity
          style={[
            styles.tc,
            {
              borderColor: '#70D07A',
              marginTop: Platform.OS == 'android' ? normalize(5) : 0
            },
          ]}>
          <Image source={Images.call} style={styles.ci} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            paddingVertical: normalize(12),
          }}
          style={{flex: 1}}>
          {CHAT.map((item, index) => {
            return (
              <View>
                <View
                  style={{
                    width: normalize(200),
                    padding: normalize(10),
                    marginBottom: normalize(5),
                    borderRadius: normalize(8),
                    backgroundColor:
                      item.type == 'sender' ? '#F2EBFF' : '#F3F3F3',
                    alignSelf:
                      item.type == 'sender' ? 'flex-end' : 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: '#161616',
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(11.5),
                    }}>
                    {item.message}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#757575',
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: normalize(10),
                    marginBottom: normalize(10),
                    alignSelf:
                      item.type == 'sender' ? 'flex-end' : 'flex-start',
                  }}>
                  {item.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={{
            height: normalize(60),
            width: '100%',
            justifyContent: 'center',
          }}>
          <View style={styles.inputc}>
            <TextInput
              value={message}
              onChangeText={txt => setMessage(txt)}
              placeholder="Send Message"
              placeholderTextColor={'#DADADA'}
              style={styles.input}
            />
            <TouchableOpacity style={styles.touch}>
              <Image source={Icons.send} style={styles.send} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  hc: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? normalize(10) : 0,
  },
  tc: {
    height: normalize(32),
    width: normalize(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(1),
    borderRadius: normalize(8),
    borderColor: 'white',
    marginTop: Platform.OS == 'android' ? normalize(5) : 0,
  },
  bi: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  ci: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
  },
  name: {
    color: '#161616',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
  },
  status: {
    backgroundColor: '#70D07A',
    height: normalize(6),
    width: normalize(6),
    borderRadius: normalize(8),
    marginTop: normalize(5),
    marginLeft: normalize(3),
  },
  inputc: {
    width: '90%',
    alignSelf: 'center',
    height: normalize(40),
    borderColor: '#DADADA',
    borderWidth: normalize(1),
    borderRadius: normalize(30),
    paddingHorizontal: normalize(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: normalize(10),
    fontFamily: Fonts.Poppins_Regular,
    color: 'black',
    fontSize: normalize(11),
  },
  touch: {
    height: normalize(32.5),
    width: normalize(32.5),
    borderRadius: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272727',
  },
  send: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: 'contain',
  },
});
