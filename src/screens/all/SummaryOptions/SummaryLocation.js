import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, FlatList, Dimensions } from "react-native";
import React, { memo, useState } from "react";
import { Fonts } from "../../../themes/Fonts";
import normalize from "../../../utils/helpers/normalize";
import axios from "axios";
import constants from "../../../utils/helpers/constants";
import { Colors } from "../../../themes/Colors";

const SummaryLocation = ({ details, onPress }) => {
  const [searchResult, setSearchResult] = useState([]);
  const API_KEY = Platform.OS === "ios" ? constants.IOS_API_KEY : constants.ANDROID_API_KEY;
  // const GEO = Geocoder.init(API_KEY);

  const [_details, setDetails] = useState({
    houseNum: "",
    landmark: details?.landmark,
    locationType: details?.landmark_type,
    isSubmitLocation: false,
  });

  function onChangeText(value) {
    searchLocation(value, true);
    setDetails((pre) => ({
      ...pre,
      houseNum: value,
    }));
  }

  async function searchLocation(value, status) {
    if (status) {
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${value}`,
        })
        .then((response) => {
          // console.log("response -- ", response.data);
          setSearchResult(response.data.predictions);
        })
        .catch((e) => {
          // console.log('error -- ', e.response);
        });
    }
  }

  function findLatLongFromPlaceId(placeId, callBack = () => {}) {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}&language=${"en"}&regions=us`)
      .then(
        (response) => {
          var result = response.data;

          let c = result?.result?.geometry?.location;

          let location = {
            latitude: c.lat,
            longitude: c.lng,
          };

          let d = result?.result?.address_components;

          callBack({
            postal_code: getdetails(d, "postal_code"),
            city: getdetails(d, "locality"),
            dist: getdetails(d, "administrative_area_level_3"),
            state: getdetails(d, "administrative_area_level_1"),
            country: getdetails(d, "country"),
            location: location,
          });
        },
        (error) => {
          // console.log(error);
          callBack(false);
        }
      );
  }

  function getdetails(arr, type) {
    let p = arr.filter((itm) => itm?.types[0] == type);
    return !_.isEmpty(arr) ? p[0]?.long_name : "";
  }

  function setSelectedLocation(location) {
    setSearchResult([]);
    setDetails((pre) => ({
      ...pre,
      houseNum: location,
    }));
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSelectedLocation(item.description)}
      style={{
        borderColor: Colors.grey_goose,
        borderWidth: 1,
        borderRadius: Dimensions.get("window").width * 0.02,
        width: "100%",
        marginTop: 5,
      }}
    >
      <Text style={{ padding: 10, color: "black" }}>{item.description}</Text>
    </TouchableOpacity>
  );

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
            onChangeText(txt);
          }}
        />
        {searchResult.length > 0 && (
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.value}
            style={{
              width: "100%",
              maxHeight: 200,
              position: "absolute",
              top: "43%",
              alignSelf: "center",
              zIndex: 10,
              backgroundColor: "white",
            }}
          />
        )}

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
                  backgroundColor: _details.locationType == item ? "#F2ECFD" : "#fff",
                  borderColor: _details.locationType == item ? "#5E17EB" : "#E3E3E3",
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
                    color: _details.locationType == item ? "#5E17EB" : "#ABABAB",
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
          disabled={_details.houseNum !== "" && _details.landmark !== "" && _details.locationType !== "" ? false : true}
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
            backgroundColor: _details.houseNum !== "" && _details.landmark !== "" && _details.locationType !== "" ? "black" : "#D8D8D8",
            height: normalize(42),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: normalize(10),
            marginTop: normalize(16),
          }}
        >
          <Text
            style={{
              color: _details.houseNum !== "" && _details.landmark !== "" && _details.locationType !== "" ? "white" : "#858585",
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
