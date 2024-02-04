import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StreamChat} from 'stream-chat';
import {
  AutoCompleteInput,
  Channel,
  ChannelAvatar,
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewTitle,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  useMessageInputContext,
} from 'stream-chat-react-native';
import C from '../../../utils/helpers/constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {Icons} from '../../../themes/Icons';
import {Fonts} from '../../../themes/Fonts';
import {Colors} from '../../../themes/Colors';
import {goBack} from '../../../utils/helpers/RootNavigation';
import {Images} from '../../../themes/Images';

const client = StreamChat.getInstance(C.GETSTREAM_API_KEY);

const Message = () => {
  const {token} = useSelector(state => state.AuthReducer);
  const {userInfo} = useSelector(state => state.UserReducer);
  const [channel, setChannel] = useState(null);
  const [providerName, setProviderName] = useState('');

  const CustomInput = () => {
    const {sendMessage, text, toggleAttachmentPicker, openCommandsPicker} =
      useMessageInputContext();
    return (
      <View
        style={{
          height: normalize(60),
          width: '100%',
          justifyContent: 'center',
        }}>
        <View style={styles.inputc}>
          <AutoCompleteInput />
          <TouchableOpacity
            style={styles.touch}
            onPress={sendMessage}
            disabled={!text}>
            <Image source={Icons.send} style={styles.send} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // const connectGetStreamChat = async () => {
  //   try {
  //     let authInfo = {
  //       id: userInfo?.id?.toString(),
  //       name: userInfo?.full_name,
  //       image: '',
  //     };
  //     await client
  //       .connectUser(authInfo, client.devToken(userInfo?.id?.toString()))
  //       .then(res => {
  //         console.log('Connected!');
  //         const channel = client.channel('messaging', {
  //           members: ['411', '407'],
  //         });
  //         channel
  //           .create()
  //           .then(res => setChannel(res))
  //           .catch(e => console.log('Channel error res----->', e));
  //       })
  //       .catch(error => Alert.alert(error.toString()));
  //   } catch (error) {
  //     Alert.alert('Error!');
  //   }
  // };

  // useEffect(() => {
  //   if (userInfo?.id) {
  //     connectGetStreamChat();
  //   }
  // }, [userInfo?.id]);

  const filters = {
    members: {$in: [userInfo?.id?.toString()]},
  };

  console.log(channel?.state?.members, '--------------->');

  const theme = {
    channelPreview: {
      container: {
        backgroundColor: 'red',
      },
    },
  };

  const fetchChannels = async () => {
    const sort = [{last_message_at: -1}];
    const _channels = await client.queryChannels(filters, sort, {
      watch: true,
      state: true,
    });
    console.log('My Channels', _channels[0]);
    let _providerName = _channels[0]?.state?.members[userInfo?.id].user?.name;
    setProviderName(_providerName);
    setChannel(_channels[0]);
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <OverlayProvider
            value={{
              style: {
                messageList: {
                  contentContainer: {
                    backgroundColor: Colors.white,
                  },
                },
              },
            }}>
            {channel && (
              <Chat client={client} closeConnectionOnBackground={false}>
                <Channel channel={channel} Input={() => null}>
                  <View style={styles.hc}>
                    <TouchableOpacity onPress={goBack} style={styles.tc}>
                      <Image source={Icons.BackArrow} style={styles.bi} />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: Platform.OS == 'android' ? normalize(5) : 0,
                      }}>
                      <Text style={styles.name}>{providerName}</Text>
                      <View style={styles.status} />
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.tc,
                        {
                          borderColor: '#70D07A',
                          marginTop:
                            Platform.OS == 'android' ? normalize(5) : 0,
                        },
                      ]}>
                      <Image source={Images.call} style={styles.ci} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1}}>
                    <MessageList />
                    <MessageInput Input={() => <CustomInput />} />
                  </View>
                </Channel>
              </Chat>
            )}
            {/* <Chat client={client} closeConnectionOnBackground={false}>
              <ChannelList
                onSelect={channel => setChannel(channel)}
                filters={filters}
              />
            </Chat> */}
          </OverlayProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Message;

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
