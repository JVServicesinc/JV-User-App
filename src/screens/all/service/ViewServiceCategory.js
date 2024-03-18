import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "../../../themes/Colors";
import normalize from "../../../utils/helpers/normalize";
import Header from "../../../components/Header";
import { Fonts } from "../../../themes/Fonts";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import showErrorAlert from "../../../utils/helpers/Toast";
import isInternetConnected from "../../../utils/helpers/NetInfo";
import { addServiceWishlistRequest, getServiceSubCategoryRequest } from "../../../redux/reducer/ServiceReducer";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Icons } from "../../../themes/Icons";
import _ from "lodash";
import LottieView from "lottie-react-native";
import Loader from "../../../utils/helpers/Loader";

const ViewServiceCategory = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ServiceReducer = useSelector((state) => state.ServiceReducer);
  const { cateId, title, id } = route?.params;
  const [data, setData] = useState([]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Animatable.View animation={"fadeInUp"} duration={400} delay={index * 100}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ViewServiceType", {
                cateId: cateId,
                id: item?.id,
                title: item?.name,
              });
            }} //ServiceDetails
            style={styles.itemV}
          >
            <Image source={{ uri: item?.image_url }} style={styles.itemImg} />

            <Text numberOfLines={2} style={styles.itemText}>
              {item.name}
            </Text>

            <TouchableOpacity
              style={styles.heart}
              onPress={() => {
                addWishlist(item);
              }}
            >
              <Image source={item?.favourite ? Icons.heart_fill : Icons.heart} style={styles.heartImg} />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animatable.View>
      );
    },
    [data]
  );

  function addWishlist(service) {
    // let fromdata = new FormData();
    // fromdata.append('type', 'service');
    // fromdata.append('ref_id', service?.id);
    // isInternetConnected()
    //   .then(() => {
    //     dispatch(addServiceWishlistRequest(fromdata));
    //   })
    //   .catch(err => {
    //     showErrorAlert('Please Connect To Internet');
    //   });
  }

  useEffect(() => {
    if (isFocused && id !== "" && cateId !== "") {
      isInternetConnected()
        .then(() => {
          dispatch(
            getServiceSubCategoryRequest({
              cateId: cateId,
              serId: id,
            })
          );
        })
        .catch((err) => {
          showErrorAlert("Please Connect To Internet");
        });
    }
  }, [isFocused, id]);

  function LoadingSkeleton() {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        {[1, 2, 3].map((item, index) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              width={"90%"}
              alignSelf="center"
              flexDirection="row"
              alignItems="center"
              marginTop={normalize(8)}
              justifyContent="space-between"
            >
              <SkeletonPlaceholder.Item width={normalize(138)} height={normalize(138)} borderRadius={8} />
              <SkeletonPlaceholder.Item width={normalize(138)} height={normalize(138)} borderRadius={8} />
            </SkeletonPlaceholder.Item>
          );
        })}
      </SkeletonPlaceholder>
    );
  }

  useEffect(() => {
    if (isFocused && !_.isEmpty(ServiceReducer?.getServiceSubCategoryRes?.data)) {
      let temp = ServiceReducer?.getServiceSubCategoryRes?.data.map((pre) => ({
        ...pre,
        favourite: false,
      }));
      setData(temp);
    } else {
      setData([]);
    }
  }, [isFocused, ServiceReducer]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <Loader
        visible={
          ServiceReducer.status == "Service/addServiceWishlistRequest"
          // ServiceReducer.status == 'Service/getCartItemsRequest' ||
          // ServiceReducer.status == 'Service/removeCartItemsRequest'
        }
      />
      <View
        style={{
          width: "100%",
          paddingHorizontal: normalize(15),
        }}
      >
        <Header title={title} isShowOrders={true} type={"service"} />
      </View>
      {ServiceReducer.status == "Service/getServiceSubCategoryRequest" ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          numColumns={2}
          renderItem={renderItem}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: normalize(50),
          }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginHorizontal: normalize(15),
            marginVertical: normalize(7),
          }}
          ListEmptyComponent={
            <View
              style={{
                marginTop: normalize(130),
              }}
            >
              <LottieView
                source={require("../../../assets/json/empty_service.json")}
                autoPlay
                loop
                style={{
                  height: normalize(200),
                  width: normalize(200),
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
                Service Not Availble
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ViewServiceCategory;

const styles = StyleSheet.create({
  itemV: {
    height: normalize(180),
    width: normalize(138),
    borderColor: Colors.border,
    borderWidth: normalize(1),
    borderRadius: normalize(15),
    padding: normalize(5),
  },
  itemImg: {
    width: "100%",
    height: normalize(115),
    resizeMode: "cover",
    borderRadius: normalize(10),
  },
  itemText: {
    fontSize: normalize(14),
    color: "#161616",
    fontFamily: Fonts.Poppins_Regular,
    marginTop: normalize(5),
    marginLeft: normalize(5),
  },
  heart: {
    width: normalize(30),
    height: normalize(30),
    position: "absolute",
    margin: normalize(2),
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(6),
    backgroundColor: Colors.white,
  },
  heartImg: {
    resizeMode: "contain",
    height: normalize(18),
    width: normalize(18),
  },
});
