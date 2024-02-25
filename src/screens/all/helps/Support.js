import { Text, View, StatusBar, Image, TouchableOpacity, SafeAreaView, Modal, Dimensions } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { Colors } from "../../../themes/Colors";
import { Fonts } from "../../../themes/Fonts";
import normalize from "../../../utils/helpers/normalize";
import { Icons } from "../../../themes/Icons";

const Support = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const OPTIONS = [
    {
      title: "Chat support",
      icon: Icons.chat,
    },
    {
      title: "Call support",
      icon: Icons.call,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}
      >
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <Header title={"Support"} />
        <Image
          source={Icons.headphone}
          style={{
            resizeMode: "contain",
            height: normalize(55),
            width: normalize(55),
            alignSelf: "center",
            marginTop: normalize(15),
          }}
        />

        <Text
          style={{
            color: "#161616",
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: normalize(16),
            alignSelf: "center",
            marginVertical: normalize(30),
          }}
        >
          How can we help you ?
        </Text>

        {OPTIONS.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (index == 0) {
                  navigation.navigate("SupportChat");
                } else {
                  setModalVisible(true);
                }
              }}
              style={{
                height: normalize(42),
                flexDirection: "row",
                backgroundColor: "#F0F0F0",
                marginBottom: normalize(12),
                borderRadius: normalize(6),
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: normalize(10),
              }}
            >
              <Image
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  resizeMode: "contain",
                  position: "absolute",
                  left: normalize(10),
                }}
                source={item.icon}
              />

              <Text
                style={{
                  color: "#161616",
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(11),
                  marginLeft: normalize(18),
                }}
              >
                {item.title}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  if (index == 0) {
                    navigation.navigate("SupportChat");
                  } else {
                    setModalVisible(true);
                  }
                }}
                style={{
                  backgroundColor: "#fff",
                  height: normalize(20),
                  width: normalize(20),
                  borderRadius: normalize(30),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: normalize(12),
                    width: normalize(12),
                    resizeMode: "contain",
                  }}
                  source={Icons.arrowRight}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={{
            backgroundColor: "#F0F0F0",
            height: normalize(45),
            width: normalize(45),
            borderRadius: normalize(50),
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: normalize(45),
          }}
        >
          <Image
            style={{
              height: normalize(22),
              width: normalize(22),
              resizeMode: "contain",
            }}
            source={Icons.mail}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "#757575",
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(10),
            alignSelf: "center",
            marginTop: normalize(10),
          }}
        >
          or mail us at
        </Text>
        <Text
          style={{
            color: "#161616",
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: normalize(12),
            alignSelf: "center",
          }}
        >
          Support@jvservices.ca
        </Text>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(false);
        // }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "10%",
              alignItems: "flex-end",
              justifyContent: "center",
              // backgroundColor: "red",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F0F0F0",
                height: normalize(24),
                width: normalize(24),
                borderRadius: normalize(50),
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10%",
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image
                style={{
                  height: normalize(18),
                  width: normalize(18),
                  resizeMode: "contain",
                }}
                source={Icons.iconClose}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: "40%",
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "60%",
                height: "40%",
                backgroundColor: "#F0F0F0",
                borderRadius: normalize(10),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: normalize(30),
                  width: normalize(30),
                  resizeMode: "contain",
                  top: normalize(-25),
                  backgroundColor: "#F0F0F0",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: Dimensions.get("window").width * 0.5,
                }}
              >
                <Image
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    resizeMode: "contain",
                  }}
                  source={Icons.call}
                />
              </View>
              <Text
                style={{
                  color: "rgba(0,0,0,0.6)",
                  fontFamily: Fonts.Poppins_SemiBold,
                  fontSize: normalize(12),
                  alignSelf: "center",
                  textAlign: "center",
                  top: normalize(-24),
                }}
              >
                {`Call Us `}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontFamily: Fonts.Poppins_Bold,
                  fontSize: normalize(15),
                  alignSelf: "center",
                  textAlign: "center",
                  top: normalize(-10),
                }}
              >
                {`+1 999999999`}
              </Text>
              <Text
                style={{
                  color: "rgba(0,0,0,0.6)",
                  fontFamily: Fonts.Poppins_SemiBold,
                  fontSize: normalize(10),
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                {`Mon - Fri \n9:00 AM - 6:00 PM`}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Support;
