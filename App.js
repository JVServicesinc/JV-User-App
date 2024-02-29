import { StyleSheet, Text, View, LogBox, TextInput, Alert, PermissionsAndroid, Linking } from "react-native";
import React, { useEffect, useMemo, useCallback } from "react";
import Test from "./src/Test";
import StackNavigator from "./src/navigators/StackNavigator";
import Verification from "./src/screens/auth/Verification";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { useDispatch, useSelector } from "react-redux";
import { setUserCurrentPosition } from "./src/redux/reducer/UserReducer";
import { getCartData, getUserData, setDeviceToken } from "./src/services/Endpoints";
import { globalLogout, setCartData, setCartId, setShowLocationDisabledModal, setUserData } from "./src/redux/reducer/GlobalSlice";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { Icons } from "./src/themes/Icons";
import { Colors } from "./src/themes/Colors";
import { Fonts } from "./src/themes/Fonts";
import Loader from "./src/utils/helpers/Loader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";
import { useStripe } from "@stripe/stripe-react-native";
import "intl-pluralrules";
import { StreamChat } from "stream-chat";
import constants from "./src/utils/helpers/constants";
import { storeData, getData } from "./src/redux/LocalStore";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const client = StreamChat.getInstance(constants.GETSTREAM_API_KEY);

const App = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  const { userInfo } = useSelector((state) => state.UserReducer);
  const { showLocationDisabledModal, isFetching } = useSelector((state) => state.GlobalReducer);

  const dispatch = useDispatch();
  // const { handleURLCallback } = useStripe();

  // const handleDeepLink = useCallback(
  //   async (url) => {
  //     if (url) {
  //       const stripeHandled = await handleURLCallback(url);
  //       if (stripeHandled) {
  //         // console.log("Stripe URL -- ", url);
  //         // This was a Stripe URL - you can return or add extra handling here as you see fit
  //       } else {
  //         // console.log("Stripe URL Error -- ", url);
  //         // This was NOT a Stripe URL – handle as you normally would
  //       }
  //     }
  //   },
  //   [handleURLCallback]
  // );

  // useEffect(() => {
  //   const getUrlAsync = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     // console.log("Initital URL --- ", initialUrl);
  //     handleDeepLink(initialUrl);
  //   };

  //   getUrlAsync();

  //   const deepLinkListener = Linking.addEventListener("url", (event) => {
  //     handleDeepLink(event.url);
  //   });

  //   return () => deepLinkListener.remove();
  // }, [handleDeepLink]);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log("Notification caused app to open from background state:", remoteMessage.notification);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log("Notification caused app to open from quit state:", remoteMessage.notification);
        }
      });
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const coordinate = position.coords;
        Geocoder.from(coordinate.latitude, coordinate.longitude)
          .then((json) => {
            dispatch(
              setUserCurrentPosition({
                location: coordinate,
                address: json.results[0]?.formatted_address,
              })
            );
          })
          .catch((error) => {
            // console.log("Current Address Error.", error);
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
      },
      // error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);

  const fetchCartData = async (cartId) => {
    if (cartId) {
      try {
        const res = await getCartData(cartId);
        if (res.status === 200) {
          // console.log("Cart Fetch Data--->", res?.data?.data);
          const cartData = res?.data?.data;
          if (cartData) {
            dispatch(setCartData(cartData));
          }
        }
      } catch (error) {
        // console.log("Cart Fetch Error--->", error);
      }
    }
  };

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      // console.log("Authorization status:", authStatus);
      if (enabled) {
        // console.log("Authorization status:", authStatus);
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log(token, "FCM token");
        storeData(constants.FCM_TOKEN, token, (token) => {
          console.log("Token --- ", token);
        });
        let data = new FormData();
        data.append("device_token", token);
        //
        await setDeviceToken(data)
          .then((res) => {
            if (res?.data) {
              // Alert.alert('Token set!');
              // console.log(res?.data);
            }
          })
          .catch(
            (e) => {
              // console.log("Error SetDeviceToken", e);
            }
            // Alert.alert(e.toString())
          );
      }
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchCartData();
    }
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserData();
        if (res?.data) {
          const userData = res?.data?.data;
          const cartId = userData?.cart_info?.cart_id;

          dispatch(setUserData(userData));
          if (cartId) {
            dispatch(setCartId(cartId));
            await fetchCartData(cartId);
          }
        }
      } catch (error) {
        // console.log(error);
        // Alert.alert(error?.response?.data?.message?.toString());
        // dispatch(globalLogout())
      }
    };

    if (token && token !== "") fetchUserData();
  }, [token]);

  useEffect(() => {
    if (token) {
      requestUserPermission();
    }
  }, [token]);

  useEffect(() => {
    console.log("App JS UserInfo -- ", userInfo);

    const addToken = () => {
      const push_provider = "firebase";
      const push_provider_name = "JeVeuxUser";

      const addStreamDeviceToken = () => {
        getData(constants.FCM_TOKEN, (fcmToken) => {
          client
            .addDevice(fcmToken, push_provider, userInfo?.id.toString(), push_provider_name)
            .then(() => {
              console.log("Device Token Registered for Stream IO");
            })
            .catch((error) => {
              console.log("Error ---- ", error);
            });
        });
      };

      let authInfo = {
        id: userInfo?.id?.toString(),
        name: userInfo?.full_name,
        image: "",
      };

      client
        .connectUser(authInfo, client.devToken(userInfo?.id?.toString()))
        .then((res) => {
          console.log("Connected!", userInfo);
          const fetchDevices = async () => {
            const devices = await client.getDevices();
            const devicesInfo = devices.devices;
            console.log("Check Devices ----", devices);
            if (devicesInfo.length > 0) {
              devicesInfo.forEach((device) => {
                if (device.id !== fcmToken) {
                  client
                    .removeDevice(device.id)
                    .then(() => {
                      console.log("Device Deleted -----");
                      addStreamDeviceToken();
                    })
                    .catch((error) => {
                      console.log("Device Deleted Error --- ", error);
                    });
                }
              });
            } else {
              addStreamDeviceToken();
            }
          };

          fetchDevices();
        })
        .catch((error) => Alert.alert(error.toString()));
    };

    if (userInfo?.id) {
      addToken();
    }
  }, [userInfo]);

  useEffect(() => {
    return () => {
      client
        .disconnectUser()
        .then((res) => console.log("Disconnct res----->", res)) //.then() //
        .catch((e) => {
          console.log("Disconnct error res----->", e);
        });
    };
  }, []);

  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  return (
    <SafeAreaProvider>
      <StackNavigator />
      <Modal
        isVisible={showLocationDisabledModal}
        animationIn="bounceInUp"
        animationInTiming={1000}
        backdropColor="rgba(255,255,255,0)"
        onBackdropPress={() => dispatch(setShowLocationDisabledModal(false))}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: Colors.white,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5.62,
              elevation: 8,
              alignItems: "center",
              padding: 16,
              borderRadius: 30,
            }}
          >
            <Text style={styles.locationPermissionHeaderText}>Location Permission required!</Text>
            <LottieView source={Icons.location_permission} style={{ height: 80, width: 80 }} autoPlay={true} />
            <Text style={styles.locationPermissionBodyText}>
              Please enable location permission in{" "}
              <Text style={{ textDecorationLine: "underline", color: "blue" }} onPress={() => Linking.openSettings()}>
                Setting{">"}Permission{">"}Location
              </Text>
              .
            </Text>
          </View>
        </View>
      </Modal>
      <Loader visible={isFetching} />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  locationPermissionHeaderText: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.red,
    textAlign: "center",
    marginBottom: 12,
  },
  locationPermissionBodyText: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
  },
});
