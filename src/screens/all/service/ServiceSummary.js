import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import normalize from "../../../utils/helpers/normalize";
import { Fonts } from "../../../themes/Fonts";
import { Icons } from "../../../themes/Icons";
import Header from "../../../components/Header";
import { Images } from "../../../themes/Images";
import { Colors } from "../../../themes/Colors";
import Picker from "../../../components/Picker";
import SummaryLocation from "../SummaryOptions/SummaryLocation";
import SelectAddress from "../SummaryOptions/SelectAddress";
import SelectDateAndTime from "../SummaryOptions/SelectDateAndTime";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import showErrorAlert from "../../../utils/helpers/Toast";
import isInternetConnected from "../../../utils/helpers/NetInfo";
import { getAllAddressRequest } from "../../../redux/reducer/UserReducer";
import LottieView from "lottie-react-native";
import { navigate } from "../../../utils/helpers/RootNavigation";
import ServiceSlotSelection from "../SummaryOptions/ServiceSlotSelection";
import { setCartData, setIsFetching } from "../../../redux/reducer/GlobalSlice";
import { getCartData } from "../../../services/Endpoints";
import { convertTo12HourFormat } from "../../../utils/helpers/time";

const { height, width } = Dimensions.get("window");
const ServiceSummary = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ServiceReducer = useSelector((state) => state.ServiceReducer);
  const { cartData, isFetching } = useSelector((state) => state.GlobalReducer);
  const [isVisible, setIsVisible] = useState(false);
  const [details, setDetails] = useState({
    address: "",
    isSubmitAddress: false,
    houseNum: "",
    landmark: "",
    locationType: "",
    isSubmitLocation: false,
    selectDate: "",
    selectTime: "",
    // isSelectDateTime: false,
  });

  const { token } = useSelector((state) => state.AuthReducer);

  const isServiceItem = cartData?.item_type === "service";
  const isCartEmpty = !!_.isEmpty(cartData?.items || []);
  const hasNullTiming = !(isServiceItem && cartData?.items?.some((item) => item?.timing === null));

  console.log(hasNullTiming);

  const [slotSelectionDetail, setSlotSelectionDetail] = useState({
    slotModal: false,
    selectedServiceId: "",
    selectedCartItemId: "",
  });

  console.log("Cart Data --- ", cartData);

  const fetchCart = async () => {
    try {
      const res = await getCartData(cartData?.cart_id);
      if (res?.status == 200) {
        const cartData = res?.data?.data;
        if (cartData) {
          dispatch(setCartData(cartData));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getAllAddressRequest());
      })
      .catch((err) => {
        showErrorAlert(t("no_internet"));
      });
  }, [isFocused]);

  // items
  const DATA = [
    {
      image: Icons.w2,
      title: "Manicure",
      price: "$499",
    },
    {
      image: Icons.w3,
      title: "Pedicure",
      price: "$499",
    },
    {
      image: Icons.w6,
      title: "Threading",
      price: "$49",
    },
  ];

  const PaymentData = [
    // {
    //   title: 'Item Total',
    //   value: '$699',
    // },
    // {
    //   title: 'Item Discount',
    //   value: '-$50',
    // },
    // {
    //   title: 'Convinience Fee',
    //   value: '$50',
    // },
    {
      title: "Sub-Total",
      value: `$${(+cartData?.subtotal || 0).toFixed(2)}`,
    },
    {
      title: "GST",
      value: `$${(+cartData?.taxes?.gst || 0).toFixed(2)}`,
    },
    {
      title: "QST",
      value: `$${(+cartData?.taxes?.qst || 0).toFixed(2)}`,
    },
    {
      title: "Total",
      value: `$${(+cartData?.subtotal + cartData?.taxes?.gst + cartData?.taxes?.qst).toFixed(2)}`,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <View
        style={{
          width: "100%",
          paddingHorizontal: normalize(15),
        }}
      >
        <Header title={"Summary"} />
      </View>
      {!_.isEmpty(cartData?.items || []) ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: normalize(30),
          }}
          style={{
            flex: 1,
          }}
        >
          <View style={styles.container}>
            <Text style={styles.title1}>Selected Services</Text>
            {cartData?.items?.map((item, index) => {
              return (
                <View
                  style={{
                    marginVertical: 4,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={styles.v}>
                      <Image source={{ uri: item?.image_url }} style={styles.img1} />
                      <View>
                        <Text style={styles.name}>{item?.service_name || item?.name}</Text>
                        <Text style={styles.price}>${item?.unit_price}</Text>
                      </View>
                    </View>

                    {item?.service_duration && (
                      <Text
                        style={{
                          color: "#757575",
                          fontFamily: Fonts.Poppins_Regular,
                          fontSize: normalize(11),
                          marginTop: "5%",
                        }}
                      >
                        • Duration {item?.service_duration} Hours
                      </Text>
                    )}
                  </View>
                  {cartData?.item_type === "service" && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30%",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.button_color,
                          fontFamily: Fonts.Poppins_SemiBold,
                          fontSize: 14,
                        }}
                        onPress={() =>
                          setSlotSelectionDetail({
                            slotModal: true,
                            selectedServiceId: item?.service_id,
                            selectedCartItemId: item?.cart_item_id,
                          })
                        }
                      >
                        {item?.timing ? convertTo12HourFormat(String(item?.timing).substring(0, 5)) : "Select Slot"}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View
            style={{
              height: normalize(200),
            }}
          >
            <FlatList
              horizontal
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(20),
              }}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      backgroundColor: "#F3F3F3",
                      height: normalize(158),
                      width: normalize(100),
                      marginLeft: normalize(12),
                      borderRadius: normalize(12),
                      padding: normalize(8),
                    }}
                  >
                    <Image
                      style={{
                        height: normalize(65),
                        width: "100%",
                        borderRadius: normalize(6),
                      }}
                      source={item.image}
                    />
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: "#161616",
                        fontFamily: Fonts.Poppins_Medium,
                        marginTop: normalize(6),
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: "#161616",
                        fontFamily: Fonts.Poppins_Regular,
                      }}
                    >
                      {item.price}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: "100%",
                        height: normalize(26),
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: Colors.black,
                        borderRadius: normalize(20),
                        justifyContent: "center",
                        marginTop: normalize(6),
                      }}
                    >
                      <Image
                        style={{
                          height: normalize(10),
                          width: normalize(10),
                          marginRight: normalize(5),
                          tintColor: "white",
                        }}
                        source={Icons.add}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: Fonts.Poppins_Medium,
                          fontSize: normalize(12),
                        }}
                      >
                        {"Add"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              // height: normalize(180),
              marginHorizontal: normalize(15),
              marginTop: normalize(10),
              marginBottom: normalize(35),
              backgroundColor: Colors.white,
              shadowColor: Platform.OS == "ios" ? "rgba(0,0,0,0.2)" : Colors.black,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 8,
              borderRadius: normalize(10),
              padding: normalize(15),
            }}
          >
            <Text
              style={{
                color: "#161616",
                fontFamily: Fonts.Poppins_Medium,
                fontSize: normalize(14),
                textDecorationLine: "underline",
                marginBottom: normalize(5),
              }}
            >
              Payment Summary
            </Text>

            {PaymentData.map((itme, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: normalize(3),
                  }}
                >
                  <Text
                    style={{
                      color: "#161616",
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Regular,
                    }}
                  >
                    {itme.title}
                  </Text>

                  <Text
                    style={{
                      color: "#161616",
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Regular,
                    }}
                  >
                    {itme.value}
                  </Text>
                </View>
              );
            })}

            {/* <View
              style={{
                backgroundColor: '#52B46B33',
                height: normalize(35),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: normalize(10),
                marginTop: normalize(12),
              }}>
              <Text
                style={{
                  color: '#52B46B',
                  fontSize: normalize(12),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Hurray ! You saved $50 on final bill
              </Text>
            </View> */}
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <LottieView autoPlay={true} source={Icons.EmptyCart} style={{ height: width * 0.5, width: width * 0.5 }} />
        </View>
      )}
      <View
        style={{
          backgroundColor: Colors.white,
          height: normalize(55),
          justifyContent: "center",
        }}
      >
        {isServiceItem ? (
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={{
              backgroundColor: !isCartEmpty && !hasNullTiming ? Colors.deactive : Colors.black,
              height: normalize(42),
              justifyContent: "center",
              marginHorizontal: normalize(15),
              alignItems: "center",
              borderRadius: normalize(10),
            }}
            disabled={!isCartEmpty && !hasNullTiming}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Medium,
              }}
            >
              Select address
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={{
              backgroundColor: isCartEmpty ? Colors.deactive : Colors.black,
              height: normalize(42),
              justifyContent: "center",
              marginHorizontal: normalize(15),
              alignItems: "center",
              borderRadius: normalize(10),
            }}
            disabled={isCartEmpty}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Medium,
              }}
            >
              Select address
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* cartData?.item_type === 'service' */}
      <Picker
        children={
          !details.isSubmitAddress ? (
            <SelectAddress
              onPressNavigate={() => {
                setIsVisible(false);
                setTimeout(() => {
                  navigation.navigate("AddNewAddress", {
                    _type: "add",
                    data: {},
                  });
                }, 500);
              }}
              onPress={(txt) => {
                setIsVisible(false);
                setTimeout(() => {
                  setDetails((pre) => ({
                    ...pre,
                    address: txt.address,
                    isSubmitAddress: txt.isSubmitAddress,
                  }));
                  setIsVisible(true);
                }, 500);
              }}
            />
          ) : (
            <SummaryLocation
              details={details?.address}
              onPress={(txt) => {
                setIsVisible(false);
                setTimeout(() => {
                  setDetails((pre) => ({
                    ...pre,
                    houseNum: txt.houseNum,
                    landmark: txt.landmark,
                    isSubmitLocation: txt.isSubmitLocation,
                  }));
                  navigate("PaymentOption", { details: details });
                }, 500);
              }}
            />
          )

          // ) : (
          //   <SelectDateAndTime
          //     onPress={txt => {
          //       setIsVisible(false);
          //       setTimeout(() => {
          //         setDetails(pre => ({
          //           ...pre,
          //           selectDate: txt.selectDate,
          //           selectTime: txt.selectTime,
          //           isSelectDateTime: txt.isSelectDateTime,
          //         }));
          //         navigate('PaymentOption');
          //       }, 500);
          //     }}
          //   />
          // )
        }
        isTabLine={true}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        height={!details.isSubmitAddress ? "50%" : !details.isSubmitLocation ? "55%" : "60%"}
      />

      <Picker
        children={
          <ServiceSlotSelection
            serviceId={slotSelectionDetail.selectedServiceId}
            cartItemId={slotSelectionDetail.selectedCartItemId}
            fetchCart={fetchCart}
            hideModal={() => setSlotSelectionDetail({ slotModal: false, selectedServiceId: "" })}
          />
        }
        height={300}
        isTabLine={true}
        isVisible={slotSelectionDetail.slotModal}
        setIsVisible={() => setSlotSelectionDetail({ slotModal: false, selectedServiceId: "" })}
      />
    </SafeAreaView>
  );
};

export default ServiceSummary;

const styles = StyleSheet.create({
  card: {
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
  container: {
    backgroundColor: "#F2ECFD",
    borderRadius: normalize(16),
    padding: normalize(12),
    marginTop: normalize(10),
    marginHorizontal: normalize(15),
  },
  title1: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
    textDecorationLine: "underline",
    marginBottom: normalize(8),
  },
  v: {
    flexDirection: "row",
    marginBottom: 2,
    alignItems: "center",
  },
  img1: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(6),
    marginRight: normalize(10),
  },
  name: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(12),
  },
  price: {
    color: "#5E17EB",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(12),
  },
});
