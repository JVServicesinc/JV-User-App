import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";

export default Preview = ({ style, item, imageKey, onPress, index, active, local }) => {
  return (
    <TouchableOpacity style={[styles.videoContainer]} onPress={() => onPress(item)}>
      <View style={[styles.imageContainer, styles.shadow]}>
        <Image
          style={[styles.videoPreview, active ? {} : { height: 140 }]}
          source={item[imageKey]} //{uri: item[imageKey]}
        />
      </View>
      {/* <Text style={styles.desc}>{item.desc}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: 275,
    // paddingVertical: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    overflow: "hidden",
  },
  videoPreview: {
    width: 275,
    height: 145,
    borderRadius: 10,
    resizeMode: "cover",
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        backgroundColor: "white",
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
