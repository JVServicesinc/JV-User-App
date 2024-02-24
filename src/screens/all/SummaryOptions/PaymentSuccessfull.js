import { View, Text, SafeAreaView, StatusBar, FlatList, ImageBackground, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Colors } from "../../../themes/Colors";
import normalize from "../../../utils/helpers/normalize";
import { Images } from "../../../themes/Images";
import { Fonts } from "../../../themes/Fonts";
import { useSelector } from "react-redux";
import { PDFDocument, rgb } from "react-native-pdf-lib";

const PaymentSuccessfull = ({ navigation, route }) => {
  const { cartData } = useSelector((state) => state.GlobalReducer);
  const orderData = route?.params?.orderData;

  // console.log("Cart Data --- ", orderData);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
    return formattedDate;
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const DATA = [
    {
      title: "Payment Mode",
      subTitle: "Debit Card",
    },
    {
      title: "Total Amount",
      subTitle: `$${cartData?.total}`,
    },
    {
      title: "Pay Date",
      subTitle: formatDate(orderData?.created_at),
    },
    {
      title: "Pay Time",
      subTitle: formatTime(new Date(orderData?.created_at)),
    },
  ];

  const doneClicked = () => {
    navigation.navigate("BookingSuccessfull");
    // downloadReceipt();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />

      <ImageBackground
        source={Images.successbg}
        resizeMode={"contain"}
        style={{
          height: "100%",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Image
          source={Images.succcesfull}
          style={{
            height: normalize(85),
            width: normalize(85),
            resizeMode: "contain",
            position: "absolute",
            alignSelf: "center",
            top: Platform.OS == "ios" ? normalize(80) : normalize(100),
          }}
        />

        <Text
          style={{
            color: "#5E17EB",
            fontSize: normalize(13),
            fontFamily: Fonts.Poppins_Regular,
            alignSelf: "center",
            marginTop: Platform.OS == "ios" ? "56%" : "62%",
          }}
        >
          Great
        </Text>

        <Text
          style={{
            color: "#161616",
            fontSize: normalize(16),
            fontFamily: Fonts.Poppins_Bold,
            alignSelf: "center",
            marginTop: normalize(10),
            marginBottom: normalize(5),
          }}
        >
          Payment Success
        </Text>

        <View>
          <FlatList
            data={DATA}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: normalize(50),
                    marginTop: normalize(12),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      color: "#757575",
                      fontSize: normalize(12),
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      color: "#757575",
                      fontSize: normalize(12),
                    }}
                  >
                    {item.subTitle}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: Platform.OS == "ios" ? normalize(75) : normalize(60),
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              color: "#757575",
              fontSize: normalize(12),
              alignSelf: "center",
            }}
          >
            Total Pay
          </Text>

          <Text
            style={{
              fontFamily: Fonts.Poppins_Bold,
              color: "#5E17EB",
              fontSize: normalize(15),
              alignSelf: "center",
              marginTop: Platform.OS == "ios" ? normalize(5) : 0,
            }}
          >
            ${cartData?.total}
          </Text>
        </View>
      </ImageBackground>
      <TouchableOpacity
        onPress={doneClicked}
        style={{
          backgroundColor: "black",
          height: normalize(42),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: normalize(10),
          marginTop: normalize(16),
          position: "absolute",
          bottom: normalize(40),
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: normalize(14),
            fontFamily: Fonts.Poppins_Medium,
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentSuccessfull;
