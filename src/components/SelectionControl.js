import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../themes/Colors";
import normalize from "../utils/helpers/normalize";
import { Fonts } from "../themes/Fonts";

const width = Dimensions.get("screen").width - 32;

const shadow = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
};

export default function SelectionControl(props) {
  const translateValue = (width - 4) / props?.tabs?.length;

  const tabTranslate = useRef(new Animated.Value(0)).current;

  const memoizedTabPressCallback = React.useCallback((index) => {
    props?.onChange(index);
  }, []);

  useEffect(() => {
    let extra = props?.currentIndex == 1 ? 3 : 0;
    Animated.spring(tabTranslate, {
      toValue: props?.currentIndex * translateValue - extra,
      stiffness: 180,
      damping: 20,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [props?.currentIndex]);

  return (
    <Animated.View
      style={[
        styles.segmentedControlWrapper,
        {
          backgroundColor: props?.segmentedControlBackgroundColor,
          marginVertical: props?.marginVertical,
        },
        {
          paddingVertical: props?.paddingVertical,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFill,
            position: "absolute",
            width: (width - 4) / props?.tabs?.length,
            top: 0,
            marginVertical: 3,
            marginHorizontal: 3,
            backgroundColor: props?.activeSegmentBackgroundColor,
            borderRadius: 10,
            ...shadow,
          },
          {
            transform: [
              {
                translateX: tabTranslate,
              },
            ],
          },
        ]}
      ></Animated.View>
      {props?.tabs.map((tab, index) => {
        const isCurrentIndex = props?.currentIndex === index;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.textWrapper]}
            onPress={() => memoizedTabPressCallback(index)}
            activeOpacity={0.7}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.textStyles,
                { color: props?.textColor },
                isCurrentIndex && { color: props?.activeTextColor },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  segmentedControlWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    width: width,
    alignSelf: "center",
  },
  textWrapper: {
    flex: 1,
    elevation: 9,
    paddingHorizontal: 10,
  },
  textStyles: {
    fontSize: normalize(13.5),
    textAlign: "center",
    fontFamily: Fonts.Poppins_Medium
  },
});

SelectionControl.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  segmentedControlBackgroundColor: PropTypes.string,
  activeSegmentBackgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  paddingVertical: PropTypes.number,
  marginVertical: PropTypes.number,
};

SelectionControl.defaultProps = {
  tabs: [],
  onChange: () => {},
  currentIndex: 0,
  segmentedControlBackgroundColor: Colors.yellow,
  activeSegmentBackgroundColor: Colors.white,
  textColor: Colors.black,
  activeTextColor: Colors.black,
  paddingVertical: 12,
  marginVertical: 15,
};
