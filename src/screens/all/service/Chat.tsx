import { ActivityIndicator, Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { Channel, ChannelList, Chat, MessageInput, MessageList, OverlayProvider, Thread } from "stream-chat-react-native";
import C from "../../../utils/helpers/constants";
import { Fonts } from "../../../themes/Fonts";
import { Colors } from "../../../themes/Colors";
import Header from "../../../components/Header";
import normalize from "../../../utils/helpers/normalize";

const client = StreamChat.getInstance(C.GETSTREAM_API_KEY);

const Message = () => {
  const { token } = useSelector((state: any) => state.AuthReducer);
  const { userInfo } = useSelector((state: any) => state.UserReducer);
  const [channel, setChannel] = useState<any>(null);
  const [providerName, setProviderName] = useState("");
  const [thread, setThread] = useState();

  // const CustomInput = () => {
  //   const { sendMessage, text, toggleAttachmentPicker, openCommandsPicker } = useMessageInputContext();
  //   return (
  //     <View
  //       style={{
  //         height: normalize(60),
  //         width: "100%",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <View style={styles.inputc}>
  //         <AutoCompleteInput />
  //         <TouchableOpacity style={styles.touch} onPress={sendMessage} disabled={!text}>
  //           <Image source={Icons.send} style={styles.send} />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  useEffect(() => {
    const connectGetStreamChat = async () => {
      try {
        let authInfo = {
          id: userInfo?.id?.toString(),
          name: userInfo?.full_name,
          image: "",
        };
        await client
          .connectUser(authInfo, client.devToken(userInfo?.id?.toString()))
          .then((res) => {
            console.log("Connected!");
            const channel = client.channel("messaging", {
              members: ["411", "407"],
            });
            setChannel(channel);
          })
          .catch((error) => Alert.alert(error.toString()));
      } catch (error) {
        Alert.alert("Error!");
      }
    };

    if (userInfo?.id) {
      connectGetStreamChat();
    }

    return () => {
      client
        .disconnectUser()
        .then((res) => console.log("Disconnct res----->", res)) //.then() //
        .catch((e) => {
          console.log("Disconnct error res----->", e);
        });
    };
  }, []);

  return (
    <OverlayProvider>
      <SafeAreaView style={{ width: "100%", height: "100%", alignItems: "center", backgroundColor: Colors.white }}>
        <View style={{ width: "90%", height: "100%" }}>
          <View style={{ width: "100%", height: "8%" }}>
            <Header
              title={"Support Chat"}
              onPress={() => {
                //
              }}
            />
          </View>
          <View style={{ width: "100%", height: "90%" }}>
            <Chat client={client}>
              {channel ? (
                <Channel channel={channel} keyboardVerticalOffset={120} thread={thread} threadList={!!thread}>
                  {thread ? (
                    <Thread />
                  ) : (
                    <>
                      {channel.state.messages ? <MessageList /> : <ActivityIndicator color={"black"} size={"large"} />}
                      <MessageInput />
                    </>
                  )}
                </Channel>
              ) : (
                <ChannelList onSelect={setChannel} />
              )}
            </Chat>
          </View>
        </View>
      </SafeAreaView>
    </OverlayProvider>
  );
};

export default Message;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  hc: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: Platform.OS == "android" ? normalize(10) : 0,
  },
  tc: {
    height: normalize(32),
    width: normalize(32),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: normalize(1),
    borderRadius: normalize(8),
    borderColor: "white",
    marginTop: Platform.OS == "android" ? normalize(5) : 0,
  },
  bi: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  ci: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: "contain",
  },
  name: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
  },
  status: {
    backgroundColor: "#70D07A",
    height: normalize(6),
    width: normalize(6),
    borderRadius: normalize(8),
    marginTop: normalize(5),
    marginLeft: normalize(3),
  },
  inputc: {
    width: "90%",
    alignSelf: "center",
    height: normalize(40),
    borderColor: "#DADADA",
    borderWidth: normalize(1),
    borderRadius: normalize(30),
    paddingHorizontal: normalize(3),
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: normalize(10),
    fontFamily: Fonts.Poppins_Regular,
    color: "black",
    fontSize: normalize(11),
  },
  touch: {
    height: normalize(32.5),
    width: normalize(32.5),
    borderRadius: normalize(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#272727",
  },
  send: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: "contain",
  },
});
