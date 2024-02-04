import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { memo, useState } from "react";
import { Fonts } from "../../../themes/Fonts";
import normalize from "../../../utils/helpers/normalize";

const SummaryLocation = ({ details, onPress }) => {
  const [_details, setDetails] = useState({
    houseNum: "",
    landmark: details?.landmark,
    locationType: details?.landmark_type,
    isSubmitLocation: false,
  });

  // console.log('details -- ', details);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: normalize(15),
        }}
      >
        <Text
          style={{
            color: "#161616",
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(14),
            marginTop: normalize(15),
          }}
        >
          {details?.first_name + " " + details?.last_name}
        </Text>

        <Text
          style={{
            color: "#757575",
            fontFamily: Fonts.Poppins_Regular,
            fontSize: normalize(10),
            marginTop: normalize(5),
          }}
        >
          {details?.street_address +
            ", " +
            details?.city +
            ", " +
            details?.province +
            ", " +
            details?.zip_code +
            ", " +
            details?.country_name}
        </Text>

        <View
          style={{
            backgroundColor: "#EBEBEB",
            height: normalize(1),
            marginTop: normalize(15),
          }}
        />

        <TextInput
          style={{
            height: normalize(40),
            borderRadius: normalize(8),
            borderColor: "#E3E3E3",
            borderWidth: normalize(1),
            paddingHorizontal: normalize(8),
            marginTop: normalize(12),
            color: "black",
          }}
          value={_details.houseNum}
          placeholder="House/Flat Number *"
          placeholderTextColor={"#ABABAB"}
          onChangeText={(txt) => {
            setDetails((pre) => ({
              ...pre,
              houseNum: txt,
            }));
          }}
        />

        <TextInput
          style={{
            height: normalize(40),
            borderRadius: normalize(8),
            borderColor: "#E3E3E3",
            borderWidth: normalize(1),
            paddingHorizontal: normalize(8),
            marginTop: normalize(12),
            color: "black",
          }}
          value={_details.landmark}
          placeholder="Landmark (Optional)"
          placeholderTextColor={"#ABABAB"}
          onChangeText={(txt) => {
            setDetails((pre) => ({
              ...pre,
              landmark: txt,
            }));
          }}
        />

        <Text
          style={{
            color: "#757575",
            fontFamily: Fonts.Poppins_Regular,
            fontSize: normalize(10),
            marginTop: normalize(10),
            marginBottom: normalize(6),
          }}
        >
          Save as
        </Text>

        <View style={{ flexDirection: "row" }}>
          {["home", "other"].map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (_details.locationType == item) {
                    setDetails((pre) => ({
                      ...pre,
                      locationType: "",
                    }));
                  } else {
                    setDetails((pre) => ({
                      ...pre,
                      locationType: item,
                    }));
                  }
                }}
                style={{
                  width: normalize(45),
                  borderRadius: normalize(8),
                  backgroundColor:
                    _details.locationType == item ? "#F2ECFD" : "#fff",
                  borderColor:
                    _details.locationType == item ? "#5E17EB" : "#E3E3E3",
                  borderWidth: normalize(1),
                  justifyContent: "center",
                  alignItems: "center",
                  height: normalize(24),
                  marginRight: normalize(10),
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(10),
                    color:
                      _details.locationType == item ? "#5E17EB" : "#ABABAB",
                    fontFamily: Fonts.Poppins_Regular,
                    textTransform: "capitalize",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          disabled={
            _details.houseNum !== "" &&
            _details.landmark !== "" &&
            _details.locationType !== ""
              ? false
              : true
          }
          onPress={() => {
            setDetails((pre) => ({
              ...pre,
              isSubmitLocation: true,
            }));

            onPress({
              houseNum: _details.houseNum,
              landmark: _details.landmark,
              isSubmitLocation: true,
            });
          }}
          style={{
            backgroundColor:
              _details.houseNum !== "" &&
              _details.landmark !== "" &&
              _details.locationType !== ""
                ? "black"
                : "#D8D8D8",
            height: normalize(42),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: normalize(10),
            marginTop: normalize(16),
          }}
        >
          <Text
            style={{
              color:
                _details.houseNum !== "" &&
                _details.landmark !== "" &&
                _details.locationType !== ""
                  ? "white"
                  : "#858585",
              fontSize: normalize(14),
              fontFamily: Fonts.Poppins_Medium,
            }}
          >
            Save and proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(SummaryLocation);
