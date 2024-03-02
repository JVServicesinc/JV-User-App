import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { Channel, ChannelList, Chat, MessageInput, MessageList, OverlayProvider, Thread } from "stream-chat-react-native";
import C from "../../../utils/helpers/constants";
import { Fonts } from "../../../themes/Fonts";
import { Colors } from "../../../themes/Colors";
import Header from "../../../components/Header";

const client = StreamChat.getInstance(C.GETSTREAM_API_KEY);

const Message = () => {
  const { userInfo } = useSelector((state) => state.UserReducer);
  const [channel, setChannel] = useState(null);
  const [thread, setThread] = useState();

  useEffect(() => {
    const connectGetStreamChat = async () => {
      try {
        client
          .connect()
          .then(() => {
            const channel = client.channel("messaging", {
              members: [userInfo?.id?.toString(), "407"],
            });
            channel
              .watch()
              .then(() => {
                // console.log("Channel is ready", channel.state.messages);
                setChannel(channel);
              })
              .catch((error) => {
                console.error("Error watching channel:", error);
              });
          })
          .catch((error) => {
            console.error("Error connecting Stream Chat client:", error);
          });
      } catch (error) {
        console.error("Stream Chat client:", error);
      }
    };

    if (userInfo?.id) {
      connectGetStreamChat();
    }
  }, []);

  return (
    <OverlayProvider>
      <SafeAreaView style={{ width: "100%", height: "100%", alignItems: "center", backgroundColor: Colors.white }}>
        <View style={{ width: "90%", height: "100%", backgroundColor: "white" }}>
          <View style={{ width: "100%", height: "6%" }}>
            <Header title={"Support Chat"} marginVertical={4} />
          </View>
          <View style={{ width: "100%", height: "94%" }}>
            <Chat client={client}>
              {channel ? (
                <Channel channel={channel} keyboardVerticalOffset={100} thread={thread} threadList={!!thread}>
                  {thread ? (
                    <Thread />
                  ) : (
                    <>
                      {channel.state.messages ? (
                        <MessageList onThreadSelect={setThread} />
                      ) : (
                        <ActivityIndicator color={"black"} size={"small"} />
                      )}
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
