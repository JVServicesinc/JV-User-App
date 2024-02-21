import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Fonts } from "../../../themes/Fonts";
import { Colors } from "../../../themes/Colors";
import { Icons } from "../../../themes/Icons";
import normalize from "../../../utils/helpers/normalize";
import { navigate } from "../../../utils/helpers/RootNavigation";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddressRequest } from "../../../redux/reducer/UserReducer";
import showErrorAlert from "../../../utils/helpers/Toast";
import isInternetConnected from "../../../utils/helpers/NetInfo";
import _ from "lodash";
import LottieView from "lottie-react-native";

const SelectAddress = ({ onPress, onPressNavigate }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const UserReducer = useSelector((state) => state.UserReducer);

  const [addressList, setAddressList] = useState([]);

  const [details, setDetails] = useState({
    address: "",
    isSubmitAddress: false,
  });

  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getAllAddressRequest());
      })
      .catch((err) => {
        showErrorAlert(t("no_internet"));
      });
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && UserReducer.status == "User/getAllAddressSuccess") {
      setAddressList(UserReducer?.getAddressAllRes?.data);
    }
  }, [UserReducer, isFocused]);

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setDetails((pre) => ({
            ...pre,
            address: item,
          }));
        }}
        style={{
          flexDirection: "row",
          marginTop: normalize(18),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setDetails((pre) => ({
              ...pre,
              address: item,
            }));
          }}
          style={{
            height: normalize(16),
            width: normalize(16),
            borderRadius: normalize(20),
            borderColor: details?.address?.id == item.id ? "#5E17EB" : "#757575",
            borderWidth: normalize(1),
            marginRight: normalize(10),
            top: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {details?.address?.id == item.id && (
            <Image
              source={Icons.tick}
              style={{
                width: normalize(10),
                height: normalize(10),
                resizeMode: "contain",
                tintColor: "#5E17EB",
              }}
            />
          )}
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: normalize(14),
              color: "#161616",
              textTransform: "capitalize",
            }}
          >
            {item?.landmark_type}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              fontSize: normalize(10),
              color: "#757575",
            }}
          >
            {item?.first_name + " " + item?.last_name + "\n"}
            {item?.street_address + ", " + item?.city + ", " + item?.province + ", " + item?.zip_code + ", " + item?.country_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
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
        Select address
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressNavigate}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: Colors.border,
          borderBottomWidth: normalize(1),
          height: normalize(40),
        }}
      >
        <Image
          style={{
            height: normalize(12),
            width: normalize(12),
            marginRight: normalize(10),
          }}
          source={Icons.add}
        />
        <Text
          style={{
            color: "#5E17EB",
            fontFamily: Fonts.Poppins_Medium,
            fontSize: normalize(12),
          }}
        >
          {"Add another address"}
        </Text>
      </TouchableOpacity>

      <View style={{ height: normalize(160) }}>
        <FlatList
          data={addressList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View>
              <LottieView
                source={require("../../../assets/json/no_data.json")}
                autoPlay
                loop
                style={{
                  height: normalize(120),
                  width: normalize(120),
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  color: "#068a8a",
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(14),
                  alignSelf: "center",
                }}
              >
                No Address Found
              </Text>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        disabled={!details.address ? true : false}
        onPress={() => {
          setDetails((pre) => ({
            ...pre,
            isSubmitAddress: true,
          }));

          onPress({
            address: details.address,
            isSubmitAddress: true,
          });
        }}
        style={{
          backgroundColor: details.address ? "black" : "#D8D8D8",
          height: normalize(42),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: normalize(10),
          marginTop: normalize(16),
        }}
      >
        <Text
          style={{
            color: details.address ? "white" : "#858585",
            fontSize: normalize(14),
            fontFamily: Fonts.Poppins_Medium,
          }}
        >
          Proceed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(SelectAddress);
