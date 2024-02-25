import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Colors } from "../../../themes/Colors";
import { Fonts } from "../../../themes/Fonts";
import normalize from "../../../utils/helpers/normalize";
import { Icons } from "../../../themes/Icons";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import constants from "../../../utils/helpers/constants";
import moment from "moment";
import { MessageHandler } from "./MessageHandler";

const client = StreamChat.getInstance(constants.GETSTREAM_API_KEY);

const SupportChat = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.UserReducer);
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    const channel = client.channel("messaging", {
      members: ["411", userInfo?.id?.toString()],
    });
    channel
      .sendMessage({
        text: message,
        userType: "user",
      })
      .then(() => {
        // console.log("Send Message res----->", messageResponse);
      })
      .catch((e) => {
        console.log("Send Message error res----->", e);
      });
  };

  useEffect(() => {
    const connectGetStreamChat = () => {
      try {
        const authInfo = {
          id: userInfo?.id?.toString(),
          name: userInfo?.full_name,
          image: "",
        };
        // console.log("Auth Info --- ", authInfo);
        client
          .connectUser(authInfo, client.devToken(userInfo?.id?.toString()))
          .then((res) => {
            console.log("StreamChat Connected!");
            const channel = client.channel("messaging", {
              members: ["411", userInfo?.id?.toString()],
            });
            channel
              .create()
              .then((res) => {
                // console.log("Channel res----->", res);
                channel
                  .query({ messages: { limit: 100 } })
                  .then(async (messageResponse) => {
                    setMessages(messageResponse.messages.reverse());

                    channel.on("message.new", (event) => {
                      // console.log("New message:", event.message, messages);
                      setMessages((prevValue) => [...prevValue.reverse(), event.message].reverse());
                    });
                    await channel.watch();
                  })
                  .catch((e) => {
                    // console.log("List Message error res----->", e);
                  });
              })
              .catch((e) => {
                // console.log("Channel error res----->", e);
              });
          })
          .catch((error) => {
            // console.log("Error --- 000 ", error);
          });
      } catch (error) {
        // console.log("Error --- 111 ", error);
      }
    };

    // console.log("User Info --- ", userInfo);
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
    <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: Colors.white, alignItems: "center" }}>
      <View style={{ width: "90%", height: "100%" }}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <Header title={"Support Chat"} />
        <KeyboardAvoidingView style={{ width: "100%", height: "100%" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ width: "100%", height: "78%" }}>
            {messages.length <= 0 ? (
              <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color={"black"} size={"large"} />
              </View>
            ) : (
              <FlatList
                inverted
                data={messages}
                style={{ width: "100%", height: "100%" }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  // console.log("Item --- ", item);
                  return (
                    <View key={item.id} style={{ marginBottom: normalize(10) }}>
                      <View
                        style={{
                          backgroundColor: "#F0F0F0",
                          padding: normalize(10),
                          width: "85%",
                          borderRadius: normalize(8),
                          alignSelf: item.userType == "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        <Text style={{ color: "#161616", fontFamily: Fonts.Poppins_Medium, fontSize: normalize(12) }}>{item.text}</Text>
                      </View>
                      <Text
                        style={{
                          color: "#757575",
                          fontFamily: Fonts.Poppins_Medium,
                          fontSize: normalize(10.5),
                          marginTop: normalize(5),
                          alignSelf: item.userType == "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        {moment(item.created_at).format("DD MMM, YYYY HH:MM A")}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          </View>
          <MessageHandler sendMessage={sendMessage} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SupportChat;
