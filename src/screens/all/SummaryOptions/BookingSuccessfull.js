import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Colors } from "../../../themes/Colors";
import normalize from "../../../utils/helpers/normalize";
import { Images } from "../../../themes/Images";
import { Fonts } from "../../../themes/Fonts";
import { Icons } from "../../../themes/Icons";
import Picker from "../../../components/Picker";
import BookingItemSkeleton from "./components/BookingItemSkeleton";
import { setCartData } from "../../../redux/reducer/GlobalSlice";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("screen");

const BookingSuccessfull = ({ navigation, route }) => {
  const [isVisible1, setIsVisible1] = useState(false);
  const { cartData, isFetching } = useSelector((state) => state.GlobalReducer);
  const dispatch = useDispatch();

  const orderData = route?.params?.orderData.data;
  console.log("Data --- ", orderData);

  const onCloseClicked = () => {
    dispatch(setCartData({}));
    navigation.navigate("Home");
  };

  const onViewBookingClicked = () => {
    // dispatch(setCartData({}));
    navigation.navigate("PaymentSuccessfull", {
      orderData: orderData,
    });
  };

  function BookingDelayed() {
    return (
      <View>
        <Text
          style={{
            color: "#161616",
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: normalize(16),
            textAlign: "center",
            marginTop: normalize(15),
          }}
        >
          Booking Delayed by 20 mins
        </Text>
        <Text
          style={{
            color: "#161616",
            fontFamily: Fonts.Poppins_Regular,
            fontSize: normalize(13),
            textAlign: "center",
            marginVertical: normalize(10),
          }}
        >
          {"Don’t worry our service boy will reach\nto you by 02:30pm as he is running\nlate due to heavy traffic."}
        </Text>
        <View style={styles.card1}>
          <Image source={Icons.testone} style={styles.img1} />
          <View style={{ marginLeft: normalize(16) }}>
            <Text style={styles.heading111}>Diamond Facial</Text>
            <Text style={styles.heading121}>• 2 hrs</Text>
            <Text style={styles.heading121}>• Includes dummy info</Text>
          </View>
        </View>

        <View style={styles.card1}>
          <Image source={Icons.testtwo} style={styles.img1} />
          <View style={{ marginLeft: normalize(16) }}>
            <Text style={styles.heading111}>Diamond Facial</Text>
            <Text style={styles.heading121}>• 30 min</Text>
            <Text style={styles.heading121}>• Includes dummy info</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        width,
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />

      <TouchableOpacity
        onPress={onCloseClicked}
        style={{
          height: normalize(30),
          width: normalize(30),
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: normalize(15),
          top: Platform.OS == "ios" ? normalize(40) : normalize(10),
        }}
      >
        <Image
          style={{
            height: normalize(20),
            width: normalize(18),
            resizeMode: "contain",
          }}
          source={Icons.close}
        />
      </TouchableOpacity>

      {/* <Text
        style={{
          color: '#161616',
          fontSize: normalize(13),
          fontFamily: Fonts.Poppins_Regular,
          marginTop: normalize(15),
          textAlign: 'center',
        }}>
        {'Dear Harry Styles you have successfully\nscheduled booking of '}
        {<Text style={{fontFamily: Fonts.Poppins_SemiBold}}>dash service</Text>}
        {'\nfor the upcoming date '}
        {<Text style={{fontFamily: Fonts.Poppins_SemiBold}}>12 Dec.</Text>}
        {' Our service\nprovider will contact you soon.'}
      </Text> */}
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            height: normalize(60),
            width: normalize(60),
            resizeMode: "contain",
            marginTop: normalize(35),
          }}
          source={Icons.smiling}
        />
        <Text
          style={{
            color: Colors.black,
            fontSize: normalize(16),
            fontFamily: Fonts.Poppins_SemiBold,
            marginTop: normalize(10),
          }}
        >
          Booking Successful !
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {/* <BookingItemSkeleton /> */}
        <FlatList
          data={cartData?.items}
          contentContainerStyle={{ width: "100%" }}
          style={{ width: "90%" }}
          renderItem={({ item }) => (
            // console.log("Item --- ", item),
            <View style={styles.card}>
              <Image
                source={{ uri: item.image_url }}
                style={[styles.img, { width: "30%", borderRadius: Dimensions.get("window").width * 0.02 }]}
                resizeMode={"cover"}
              />
              <View style={{ width: "65%" }}>
                <Text style={styles.heading11}>• {item.service_name}</Text>
                <Text style={styles.subtest12}>• {item.service_duration} hrs</Text>
                <Text style={styles.subtest12}>• Includes dummy info test description long</Text>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={onViewBookingClicked}
        style={{
          backgroundColor: "black",
          height: normalize(42),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: normalize(10),
          marginTop: normalize(16),
          // position: 'absolute',
          // bottom: normalize(40),
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
          View booking
        </Text>
      </TouchableOpacity>

      {isVisible1 && (
        <Picker children={BookingDelayed()} isTabLine={true} isVisible={isVisible1} setIsVisible={setIsVisible1} height={"58%"} />
      )}
    </SafeAreaView>
  );
};

export default BookingSuccessfull;

const styles = StyleSheet.create({
  card: {
    padding: normalize(14),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 6,
  },
  img: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: "contain",
  },
  heading11: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  heading12: {
    fontSize: normalize(11),
    color: "#757575",
    fontFamily: Fonts.Poppins_Regular,
  },
  card1: {
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(16),
    borderWidth: normalize(1.5),
    borderColor: Colors.gray,
    borderRadius: normalize(18),
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(12),
    width: "90%",
    alignSelf: "center",
  },
  img1: {
    height: normalize(80),
    width: normalize(90),
    resizeMode: "contain",
  },
  heading111: {
    fontSize: normalize(12),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  heading121: {
    fontSize: normalize(11),
    color: "#757575",
    fontFamily: Fonts.Poppins_Regular,
  },
});
