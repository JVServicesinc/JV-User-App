import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { Fonts } from "../../../themes/Fonts";
import { Icons } from "../../../themes/Icons";
import normalize from "../../../utils/helpers/normalize";
import { useState } from "react";

interface Props {
  sendMessage: (message: string) => void;
}

export const MessageHandler = ({ sendMessage }: Props) => {
  const [message, setMessage] = useState("");

  const pushMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <View
      style={{
        height: normalize(40),
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        borderColor: "#DADADA",
        borderWidth: normalize(1),
        borderRadius: normalize(50),
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          paddingHorizontal: normalize(6),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            // paddingHorizontal: normalize(10),
            color: "black",
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(12),
          }}
          autoCorrect={false}
          spellCheck={false}
          value={message}
          placeholder="Send Message"
          placeholderTextColor={"#DADADA"}
          onChangeText={(txt) => setMessage(txt)}
        />
        <TouchableOpacity
          style={{
            height: normalize(35),
            width: normalize(35),
            borderRadius: normalize(40),
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={pushMessage}
        >
          <Image
            source={Icons.sent}
            style={{
              height: normalize(16),
              width: normalize(16),
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
