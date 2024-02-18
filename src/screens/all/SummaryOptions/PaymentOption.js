import { View, FlatList, TouchableOpacity, Image, Text, SafeAreaView, StatusBar, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../themes/Colors";
import normalize from "../../../utils/helpers/normalize";
import Header from "../../../components/Header";
import { Icons } from "../../../themes/Icons";
import { Fonts } from "../../../themes/Fonts";
import { Images } from "../../../themes/Images";
import { goBack, navigate, replace } from "../../../utils/helpers/RootNavigation";
import { PaymentSheet, StripeProvider, useStripe, initStripe } from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment, confirmStripePayment, createOrder, createPaymentIntent, getCartData } from "../../../services/Endpoints";
import { ShowToast } from "../../../utils/helpers/Toast";
import { setCartData, setIsFetching } from "../../../redux/reducer/GlobalSlice";
import constants from "../../../utils/helpers/constants";

const PaymentOption = ({ navigation, route }) => {
  const orderDetails = route?.params?.details;

  // console.log(orderDetails?.address?.id, "Order details ----->");

  const [selectIndex, setSelectIndex] = useState(-1);
  const { cartData } = useSelector((state) => state.GlobalReducer);
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } = useStripe();
  const dispatch = useDispatch();
  const [intentKey, setIntentKey] = useState();
  const [orderUId, setOrderUId] = useState();
  const DATA = [
    {
      title: "Debit & Credit Cards",
      image: Icons.card,
      key: "cards",
    },
    // {
    //   title: 'Google Pay',
    //   image: Icons.GPay
    // },
    // {
    //   title: 'Apple Pay',
    //   image: Icons.ApplePay
    // },
    // {
    //   title: 'UPI',
    //   image: Icons.upi
    // },
    // {
    //   title: 'Net Banking',
    //   image: Icons.bank
    // },
    // {
    //   title: 'Cash',
    //   image: Icons.cash,
    //   key: 'cash',
    // },
  ];
  // console.log("Cart ID", cartData);

  const handlePayment = async () => {
    console.log(intentKey);
    try {
      if (intentKey) {
        const paymentSheet = await presentPaymentSheet({
          clientSecret: intentKey,
        });
        if (paymentSheet.error) {
          console.log(paymentSheet.error);
          // if(paymentSheet.error.code === 'Canceled'){
          //   ShowToast('Something went wrong!');
          // }
          ShowToast(paymentSheet?.error?.localizedMessage || "Something went wrong!");
          return;
        }
      }
      dispatch(setIsFetching(true));
      console.log(orderUId);
      const data = new FormData();
      data.append("order_id", orderUId);
      const orderConfRes = await confirmStripePayment(data);
      if (orderConfRes?.status == 200) {
        ShowToast("Order successfully placed!");
        dispatch(setCartData({}));
        dispatch(setIsFetching(false));
        replace("BookingSuccessfull", { orderId: orderUId });
      }
    } catch (error) {
      console.log(error);
      dispatch(setIsFetching(false));
    }
  };

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

  const initPayment = async () => {
    try {
      dispatch(setIsFetching(true));
      let formdata = new FormData();

      let payload = {
        cart_id: cartData?.cart_id,
        customer_address_id: orderDetails?.address?.id,
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      };

      // console.log("Payload---->", payload);

      for (key in payload) {
        formdata.append(key, payload[key]);
      }
      //   .then(res => {
      //     console.log(res?.data?.data);
      //     const orderId = res?.data?.data?.order_id;
      //     console.log(orderId, 'Order ID---------->');
      //     if (orderId) {
      //       // const payload = new FormData();
      //       createPaymentIntent(orderId)
      //         .then(res => {
      //           const paymentIntent = res?.data?.data?.paymentIntent;
      //           if (paymentIntent) {
      //             initPaymentSheet({
      //               merchantDisplayName: 'JV',
      //               paymentIntentClientSecret: paymentIntent,
      //             }).then(
      //               async () =>
      //                 await presentPaymentSheet()
      //                   .then(async res => {
      //                     if (res.error) {
      //                       console.log('Success!', res);
      //                       ShowToast(
      //                         res?.error?.message || 'Something went wrong!',
      //                       );
      //                     }else{
      //                       let data = new FormData();
      //                       data.append("order_id", orderId);
      //                       const res = await confirmPayment();
      //                       if(res?.status == 200){
      //                         confirmPaymentSheetPayment().then(() => {
      //                           ShowToast("Order confirmed successfully");
      //                           navigate('BookingSuccessfull')
      //                         })
      //                       }
      //                     }
      //                   })
      //                   .catch(e => ShowToast('Something went wrong!')),
      //             );
      //           }
      //           console.log(paymentIntent, '<-----Intent');
      //         })
      //         .catch(e =>
      //           console.log(e?.response?.data, '<-----Intent creation'),
      //         );
      //     } else {
      //       ShowToast('Something went wrong!');
      //     }
      //   })
      //   .catch(e => {
      //     ShowToast('Something went wrong!');
      //     console.log(e.response.data.errors, 'error');
      //   })
      //   .finally(() => dispatch(setIsFetching(false)));
      // console.log("Create Order Form Data --- ", formdata);
      const orderRes = await createOrder(formdata);
      // console.log("Order Result --- ", orderRes.status, orderRes);
      if (orderRes.status == 200) {
        const orderId = orderRes?.data?.data?.order_id;
        setOrderUId(orderId);
        const res = await createPaymentIntent(orderId);
        console.log("Payment Intent --- ", res?.data);
        if (res.status == 200) {
          const paymentIntent = res?.data?.data?.paymentIntent;
          const ephemeralKey = res?.data?.data?.ephemeralKey;
          setIntentKey(paymentIntent);
          console.log(paymentIntent, ephemeralKey);
          const init = await initPaymentSheet({
            merchantDisplayName: "JV",
            returnURL: constants.STRIPE_RETURN_URL,
            paymentIntentClientSecret: paymentIntent,
            customerEphemeralKeySecret: ephemeralKey,
          });
          if (init.error) {
            // ShowToast('Something went wrong!');
            console.log("Payment Intent Error --- ", init.error);
            return;
          }
          // ShowToast("Order Created")
        }
      } else {
        ShowToast("Something went wrong!");
        goBack();
        return;
      }
      dispatch(setIsFetching(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initPayment();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <View
        style={{
          width: "100%",
          paddingHorizontal: normalize(15),
        }}
      >
        <Header title={"Payment Option"} disableRightIcon={true} onPress={() => navigate("ServiceSummary")} />
      </View>

      <View>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectIndex(index)}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: normalize(15),
                  marginVertical: normalize(10),
                }}
              >
                <TouchableOpacity
                  style={{
                    width: normalize(22),
                    position: "absolute",
                    left: 0,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                  onPress={() => setSelectIndex(index)}
                >
                  <View
                    style={{
                      borderColor: selectIndex == index ? "#5E17EB" : "#161616",
                      borderWidth: normalize(1),
                      height: normalize(14),
                      width: normalize(14),
                      borderRadius: normalize(15),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectIndex == index && (
                      <View
                        style={{
                          backgroundColor: "#5E17EB",
                          height: normalize(8),
                          width: normalize(8),
                          borderRadius: normalize(15),
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    color: "#161616",
                    fontSize: normalize(13),
                    marginLeft: normalize(22),
                  }}
                >
                  {item.title}
                </Text>
                <Image
                  source={item.image}
                  style={{
                    resizeMode: "cover",
                    height: normalize(22),
                    width: normalize(26),
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* <View
          style={{
            backgroundColor: '#F5C443',
            height: normalize(40),
            borderRadius: normalize(6),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: normalize(10),
            marginHorizontal: normalize(15),
          }}>
          <Image
            style={{
              height: normalize(16),
              width: normalize(16),
              resizeMode: 'contain',
              position: 'absolute',
              top: -normalize(10.5),
              left: normalize(60),
              tintColor: '#F5C443',
            }}
            source={Images.uparrow}
          />
          <Image
            style={{
              height: normalize(18),
              width: normalize(18),
              resizeMode: 'contain',
              marginRight: normalize(5),
            }}
            source={Icons.hur}
          />
          <Text
            style={{
              color: '#161616',
              fontSize: normalize(9),
              fontFamily: Fonts.Poppins_Regular,
            }}>
            {
              'No extra amount will be charged when you pay\nusing your SeekMe wallet'
            }
          </Text>
        </View> */}

      <TouchableOpacity
        onPress={handlePayment}
        style={{
          backgroundColor: selectIndex !== -1 ? "black" : "#D8D8D8",
          height: normalize(42),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: normalize(10),
          marginTop: normalize(16),
          position: "absolute",
          bottom: normalize(40),
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: selectIndex !== -1 ? "white" : "#858585",
            fontSize: normalize(14),
            fontFamily: Fonts.Poppins_Medium,
          }}
        >
          Proceed
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentOption;
