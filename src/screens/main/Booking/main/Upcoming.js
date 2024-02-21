import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../../../themes/Colors";
import normalize from "../../../../utils/helpers/normalize";
import * as Animatable from "react-native-animatable";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Fonts } from "../../../../themes/Fonts";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../../../redux/reducer/AuthReducer";

const Upcoming = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(setCurrentTab(false));
    }
  }, [isFocused]);

  return (
    <View style={styles.primary}>
      <Animatable.View animation={"fadeInLeft"} duration={400} delay={50} style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.text15}>10th{"\n"}Apr, Sunday</Text>
          <Text
            style={{
              fontSize: normalize(12),
              color: Colors.black,
              fontFamily: Fonts.Poppins_Medium,
            }}
          >
            Salon for Woman
          </Text>
        </View>
        <View style={{ marginTop: normalize(5) }}>
          <Text style={styles.subtest12}>• Diamond Facial</Text>
          <Text style={styles.subtest12}>• Cleanup</Text>
        </View>
        <View style={{ ...styles.container, marginTop: normalize(5) }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RescheduleBooking")}
            style={{ ...styles.btn, backgroundColor: Colors.button_color }}
          >
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: "500",
                color: Colors.white,
              }}
            >
              Reshedule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("UpcomingBookingDetails")} style={styles.btn}>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: "500",
                color: Colors.black,
              }}
            >
              View details
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(18),
  },
  card: {
    backgroundColor: Colors.cardColor,
    padding: normalize(15),
    borderRadius: normalize(18),
    marginTop: normalize(15),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    paddingVertical: normalize(12),
    borderRadius: normalize(8),
    justifyContent: "center",
    alignItems: "center",
  },
  text15: {
    fontSize: normalize(15),
    color: Colors.black,
    fontFamily: Fonts.Poppins_Medium,
  },
  subtest12: {
    fontSize: normalize(12),
    color: Colors.subtext,
    fontFamily: Fonts.Poppins_Medium,
  },
});
