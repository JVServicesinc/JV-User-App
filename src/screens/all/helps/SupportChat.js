import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';

const SupportChat = ({navigation}) => {
  const [message, setMessage] = useState('');

  const CHAT = [
    {
      message: 'Hi Harry, how can I help you today ?',
      time: 'Today 09:37 am',
      user: 'receiver',
    },
    {
      message: 'I have issues with certain problem here',
      time: 'Today 09:38 am',
      user: 'sender',
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <Header title={'Support Chat'} />

        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={CHAT}
            keyExtractor={(item, index) => index.toString()}
            style={{flex: 1}}
            contentContainerStyle={{
              paddingBottom: normalize(50),
              paddingTop: normalize(10),
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginBottom: normalize(15),
                  }}>
                  <View
                    style={{
                      backgroundColor: '#F0F0F0',
                      padding: normalize(10),
                      width: '85%',
                      borderRadius: normalize(6),
                      alignSelf:
                        item.user == 'sender' ? 'flex-end' : 'flex-start',
                    }}>
                    <Text
                      style={{
                        color: '#161616',
                        fontFamily: Fonts.Poppins_Medium,
                        fontSize: normalize(12),
                      }}>
                      {item.message}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#757575',
                      fontFamily: Fonts.Poppins_Medium,
                      fontSize: normalize(10.5),
                      marginTop: normalize(5),
                      alignSelf:
                        item.user == 'sender' ? 'flex-end' : 'flex-start',
                    }}>
                    {item.time}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View
        style={{
          height: normalize(80),
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            borderColor: '#DADADA',
            borderWidth: normalize(1),
            borderRadius: normalize(50),
            marginHorizontal: normalize(15),
            height: normalize(43),
            marginTop: normalize(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: normalize(3),
          }}>
          <TextInput
            style={{
              flex: 1,
              paddingHorizontal: normalize(10),
              color: 'black',
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(12),
            }}
            value={message}
            placeholder="Send Message"
            placeholderTextColor={'#DADADA'}
            onChangeText={txt => setMessage(txt)}
          />
          <TouchableOpacity
            style={{
              height: normalize(35),
              width: normalize(35),
              borderRadius: normalize(40),
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Icons.sent}
              style={{
                height: normalize(16),
                width: normalize(16),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SupportChat;
