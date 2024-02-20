import React, { useState, useEffect, memo } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  Image,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import normalize from "../utils/helpers/normalize";
import _ from "lodash";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { Colors } from "../themes/Colors";
import { Fonts } from "../themes/Fonts";
import { Icons } from "../themes/Icons";
import { getCurrentLocation } from "../utils/helpers/halper";
import Geocoder from "react-native-geocoding";
import { goBack } from "../utils/helpers/RootNavigation";
import { useDispatch } from "react-redux";
import { setUserCurrentPosition } from "../redux/reducer/UserReducer";
import constants from "../utils/helpers/constants";

const { height, width } = Dimensions.get("window");
const API_KEY = Platform.OS === "ios" ? constants.IOS_API_KEY : constants.ANDROID_API_KEY;
const GEO = Geocoder.init(API_KEY);

const GoogleAutoCompleteAddress = (props) => {
  const [currentLocation, setCurrentLocation] = useState({});
  const dispatch = useDispatch();

  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  function onSubmit(ref) {
    if (props.onSubmit) {
      props.onSubmit(ref);
    }
  }

  const [searchResult, setSearchResult] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (isFocus) {
      searchLocation(props?.value, isFocus);
    } else {
      setSearchResult([]);
    }
  }, [props?.value, isFocus]);

  async function searchLocation(key, status) {
    if (status) {
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${key}`,
        })
        .then((response) => {
          // console.log('response -- ', response.data);
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

  function getCurrentloc() {
    getCurrentLocation((res) => {
      if (res !== false) {
        setCurrentLocation({
          latitude: res?.latitude,
          longitude: res?.longitude,
          latitudeDelta: 0.015, // 0.03
          longitudeDelta: 0.0121, // 0.03
        });

        getAddress(res);
      }
    });
  }

  function getAddress(coordinate) {
    // console.log('coordinate -- ',coordinate);
    Geocoder.from(coordinate.latitude, coordinate.longitude)
      .then((json) => {
        onChangeText(json.results[0]?.formatted_address);
        dispatch(
          setUserCurrentPosition({
            location: coordinate,
            address: json.results[0]?.formatted_address,
          })
        );
      })
      .catch((error) => {
        // console.log("addressComponent error ", error);
      });

    Geocoder.from({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    Geocoder.from({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    });

    Geocoder.from([coordinate.latitude, coordinate.longitude]);
  }

  return (
    <View
      style={[
        {
          alignSelf: "center",
          marginTop: props?.marginTop ? props?.marginTop : normalize(25),
          width: props?.width ? props?.width : "90%",
          margin: props?.margin ? props?.margin : normalize(6),
          backgroundColor: Colors.white,
          borderTopLeftRadius: normalize(30),
          borderTopRightRadius: normalize(30),
          borderBottomLeftRadius: !_.isEmpty(searchResult) && isFocus ? normalize(8) : normalize(30),
          borderBottomRightRadius: !_.isEmpty(searchResult) && isFocus ? normalize(8) : normalize(30),
          color: Colors.black,
          fontSize: props?.fontSize ? props?.fontSize : normalize(13),
          fontFamily: Fonts.Poppins_Medium,
          shadowColor: Platform.OS == "android" ? "rgba(0,0,0,0.5)" : "rgba(195, 195, 195, 0.9)",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        props.style,
      ]}
    >
      <View style={styles.searchContainer}>
        <Image source={Icons.Search} style={styles.searchImg} />
        <TextInput
          placeholderTextColor={props.placeholderTextColor}
          placeholder={props?.placeholder}
          style={styles.searchInput}
          value={props.value}
          onChangeText={(txt) => onChangeText(txt)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <TouchableOpacity onPress={() => getCurrentloc()} style={styles.my_location}>
          <Image source={Icons.my_location} style={styles.my_locationImg} />
        </TouchableOpacity>
      </View>

      {!_.isEmpty(searchResult) && isFocus && (
        <FlatList
          data={searchResult}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps={"always"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: normalize(5),
            paddingBottom: normalize(60),
          }}
          style={{
            height: normalize(200),
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: normalize(40),
                  borderTopColor: "#ccc",
                  paddingHorizontal: normalize(5),
                  borderTopWidth: index == 0 ? normalize(0) : 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  onChangeText(item?.description);
                  findLatLongFromPlaceId(item?.place_id, (res) => {
                    onSubmit(res);

                    dispatch(
                      setUserCurrentPosition({
                        location: res?.location,
                        address: res?.city + ", " + res?.state + " " + res?.postal_code + ", " + res?.country,
                      })
                    );
                  });
                  setSearchResult([]);
                  setTimeout(() => {
                    Keyboard.dismiss();
                  }, 10);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ccc",
                    height: normalize(6),
                    width: normalize(6),
                    borderRadius: normalize(10),
                    marginRight: normalize(8),
                  }}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    color: "rgba(0,0,0,0.8)",
                    fontSize: normalize(11),
                    fontFamily: Fonts.Poppins_Medium,
                    width: "95%",
                  }}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default GoogleAutoCompleteAddress;

GoogleAutoCompleteAddress.propTypes = {
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.any,
  inputHeight: PropTypes.any,
  placeholderTextColor: PropTypes.string,
  placeholder: PropTypes.string,
  isLeftOptions: PropTypes.bool,
  isRightOptions: PropTypes.bool,
};

GoogleAutoCompleteAddress.defaultProps = {
  value: "",
  onChangeText: "",
  inputHeight: normalize(48),
  placeholderTextColor: "grey",
  placeholder: "Provide the City or Zip",
  isLeftOptions: false,
  isRightOptions: false,
};

const styles = StyleSheet.create({
  searchContainer: {
    height: normalize(45),
    flexDirection: "row",
    borderColor: Colors.grey_goose,
    borderWidth: normalize(1),
    borderRadius: normalize(30),
    alignItems: "center",
    overflow: "hidden",
  },
  searchImg: {
    width: "10%",
    height: normalize(20),
    resizeMode: "contain",
    marginLeft: normalize(12),
  },
  searchInput: {
    height: "100%",
    width: "65%",
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(15),
    color: Colors.black,
    paddingEnd: normalize(5),
  },
  my_location: {
    backgroundColor: Colors.rangoon_green,
    height: "100%",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  my_locationImg: {
    width: normalize(20),
    height: normalize(20),
    resizeMode: "contain",
    marginRight: normalize(12),
  },
});
