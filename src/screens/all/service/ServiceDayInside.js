import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { Fonts } from "../../../themes/Fonts";
import normalize from "../../../utils/helpers/normalize";
import { Colors } from "../../../themes/Colors";
import { Images } from "../../../themes/Images";
import { Icons } from "../../../themes/Icons";
import Picker from "../../../components/Picker";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useIsFocused } from "@react-navigation/native";
import { getCurrentLocation } from "../../../utils/helpers/halper";
import constants from "../../../utils/helpers/constants";
const MAP_PLATFROM_TYPE = Platform.OS === "android" ? "terrain" : "standard";
import { SOCKET_ACTIONS, SocketService } from "../../../utils/helpers/SocketService";

const { width, height } = Dimensions.get("window");
const SIZES = {
  radius: 30,
  padding: 10,
  width,
  height,
};

const ServiceDayInside = ({ navigation }) => {
  const [isVisibleReview, setIsVisibleReview] = useState(false);
  const mapMainRef = useRef();
  const isLastUpdate = useRef(0);
  const isfocused = useIsFocused();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [region, setRegion] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [angle, setAngle] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPreviousDirection, setIsPreviousDirection] = useState(null);

  const review = [
    {
      name: "Joan Perkins",
      rate: "4.0",
      time: "1 day ago",
      comment: "Jim has done a fabulous job, it took exactly the same time as mentioned and he came on time to our doorstep.",
    },
    {
      name: "Franky K",
      rate: "4.0",
      time: "2 day ago",
      comment: "Jim has done a fabulous job, it took exactly the same time as mentioned and he came on time to our doorstep.",
    },
  ];

  useEffect(() => {
    if (isfocused) {
      // setTimeout(() => {
      let toCoordinates = {
        latitude: 17.4374,
        longitude: 78.4487,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
      setToLocation(toCoordinates);
      setIsTracking(true);
      // }, 2000);
    }
  }, [isfocused]);

  useEffect(() => {
    if (isTracking && toLocation !== null) {
      let fromLoc = {
        latitude: 17.3676, // 22.576086374153196,
        longitude: 78.5246, // 88.42683534564392,
        latitudeDelta: 0.015, // 0.03
        longitudeDelta: 0.0121, // 0.03
      };
      setCurrentLocation(fromLoc);

      const mapRegion = {
        latitude: (fromLoc.latitude + toLocation?.latitude) / 2,
        longitude: (fromLoc.longitude + toLocation?.longitude) / 2,
        latitudeDelta: Math.abs(fromLoc.latitude - toLocation?.latitude) * 2,
        longitudeDelta: Math.abs(fromLoc.longitude - toLocation?.longitude) * 2,
      };

      setFromLocation(fromLoc);

      if (isLastUpdate.current == 10) {
        isLastUpdate.current = 0;
      }

      if (isLastUpdate.current == 0) {
        isLastUpdate.current = isLastUpdate.current + 1;
        setIsPreviousDirection({
          from: fromLoc,
          to: toLocation,
        });
      } else {
        isLastUpdate.current = isLastUpdate.current + 1;
      }

      setTimeout(() => {
        setRegion(mapRegion);
      }, 1000);
    }
  }, [isTracking, toLocation]);

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]["latitude"];
    let startLng = coordinates[0]["longitude"];
    let endLat = coordinates[1]["latitude"];
    let endLng = coordinates[1]["longitude"];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  function renderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <Image
          source={Icons.pin}
          style={{
            width: 28,
            height: 28,
            resizeMode: "contain",
          }}
        />
      </Marker>
    );

    const userMarkerIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{ x: 0.5, y: 0.5 }}
        flat={true}
        // rotation={angle}
      >
        <Image
          source={Icons.user1}
          style={{
            width: 40,
            height: 40,
            borderRadius: normalize(40),
            borderWidth: normalize(2),
            borderColor: Colors.white,
            resizeMode: "contain",
          }}
        />
      </Marker>
    );

    return (
      <MapView
        ref={mapMainRef}
        provider={PROVIDER_GOOGLE}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          height: "100%",
        }}
        onMapLoaded={() => {
          // animated
        }}
        // onLayout={() => {
        //   animateMap(currentLocation.latitude, currentLocation.longitude);
        // }}
        // region={currentLocation}//trackingRegion
        region={isTracking && region !== null ? region : currentLocation}
        // initialRegion={
        //   isTracking && region !== null ? region : currentLocation
        // }
        zoomEnabled={true}
        mapType={MAP_PLATFROM_TYPE} //satellite
        toolbarEnabled={true}
        showsCompass={true}
        showsScale={true}
        loadingEnabled={true}
        showsBuildings={true}
        showsMyLocationButton={false}
        showsTraffic={false}
        moveOnMarkerPress={false}
        userLocationPriority={"high"}
        followsUserLocation={false}
        showsPointsOfInterest={false}
        rotateEnabled={true}
        showsUserLocation={false} // show current location
        paddingAdjustmentBehavior={"automatic"}
        tracksViewChanges={false}
        // onPress={event => {
        //   animateMap(
        //     event.nativeEvent.coordinate.latitude,
        //     event.nativeEvent.coordinate.longitude,
        //   );
        // }}
        precision="high"
      >
        {isTracking && fromLocation !== null && toLocation !== null ? (
          <>
            {/* {isPreviousDirection?.from &&
              isPreviousDirection?.to &&
              Platform.OS == 'ios' && (
                <MapViewDirections
                  origin={isPreviousDirection?.from}
                  destination={isPreviousDirection?.to}
                  apikey={
                    Platform.OS === 'ios'
                      ? constants.IOS_API_KEY
                      : constants.ANDROID_API_KEY
                  }
                  strokeWidth={0}
                  // strokeColor={'#5E17EB'}
                  // optimizeWaypoints={true}
                />
              )} */}
            <MapViewDirections
              origin={fromLocation}
              destination={toLocation}
              apikey={Platform.OS === "ios" ? constants.IOS_API_KEY : constants.ANDROID_API_KEY}
              strokeWidth={4}
              strokeColor={"#5E17EB"}
              optimizeWaypoints={false}
              resetOnChange={false}
              precision="high"
              onReady={(result) => {
                // console.log('On Directions Ready --- ', result);
                setDuration(result.duration);
                if (!isReady) {
                  // Fit route into maps
                  mapMainRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: SIZES.width / 20,
                      bottom: SIZES.height / 4,
                      left: SIZES.width / 20,
                      top: SIZES.height / 8,
                    },
                    animated: true,
                  });

                  // Reposition the car
                  let nextLoc = {
                    latitude: result.coordinates[0]["latitude"],
                    longitude: result.coordinates[0]["longitude"],
                  };

                  setFromLocation(nextLoc);
                  setIsReady(true);
                }

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }
              }}
            />
          </>
        ) : null}
        {isTracking && toLocation !== null && destinationMarker()}
        {fromLocation !== null && isTracking ? userMarkerIcon() : null}

        {/* Current Location */}
        {!isTracking && (
          <Marker coordinate={currentLocation}>
            <Image
              source={Icons.pin}
              resizeMode="contain"
              style={{
                height: normalize(22),
                width: normalize(22),
              }}
            />
          </Marker>
        )}
      </MapView>
    );
  }

  const fitToCoordinates = (source, destination) => {
    const allCoordinates = [...[source], ...[destination]];
    mapMainRef.current.fitToCoordinates(allCoordinates, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  };

  function animateMap(latitude, longitude) {
    try {
      mapMainRef.current.animateCamera({
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 18,
      });
    } catch (error) {
      // console.log("error --- ", error);
    }
  }

  function getMyCurrentLocation() {
    getCurrentLocation((res) => {
      if (res !== false) {
        setIsTracking(false);
        animateMap(res?.latitude, res?.longitude);
        setCurrentLocation({
          latitude: res?.latitude,
          longitude: res?.longitude,
          latitudeDelta: 0.015, // 0.03
          longitudeDelta: 0.0121, // 0.03
        });
      } else {
        animateMap(currentLocation.latitude, currentLocation.longitude);
      }
    });
  }

  useEffect(() => {
    const socketSetvice = SocketService.getInstance();

    const trackSocketActions = (socketAction, data) => {
      const action = {
        [SOCKET_ACTIONS.CONNNECTED]: () => {},
        [SOCKET_ACTIONS.DISCONNECTED]: () => {},
        [SOCKET_ACTIONS.RECONNECTED]: () => {},
        [SOCKET_ACTIONS.RECONNECTATTEMPT]: () => {},
        [SOCKET_ACTIONS.ERROR]: () => {},
        [SOCKET_ACTIONS.AUTORESPONSE]: () => {
          // console.log("Received Socket Auto Response -- ", data);

          const userLocation = { latitude: 17.43748, longitude: 78.4487 };

          let mapRegion = {
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          };

          const origin = { latitude: data.latitude, longitude: data.longitude };
          setFromLocation(mapRegion);
          fitToCoordinates(origin, userLocation);
        },
        default: () => {
          //
        },
      };

      action[socketAction] ? action[socketAction]() : action["default"]();
    };

    // console.log("Socket Service -- ", socketSetvice);
    socketSetvice.connect(trackSocketActions);

    return () => {
      socketSetvice.disConnectSocket();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <View
        style={{
          flex: 0.5,
        }}
      >
        {renderMap()}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.bc}>
          <Image source={Icons.BackArrow} style={styles.bi} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getMyCurrentLocation()} onLongPress={() => setIsTracking(true)} style={styles.bc1}>
          <Image source={Icons.gps} style={styles.gps} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.7,
          backgroundColor: Colors.white,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.udc}>
            <Image source={Icons.user1} style={styles.ui} />
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.ut}>Jim Carrey</Text>
                <Text style={styles.ust}>Electrician</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image style={styles.star} source={Icons.star} />
                  <Text style={styles.rt}>{" 4.8 (27)"}</Text>
                </View>

                <TouchableOpacity onPress={() => setIsVisibleReview(true)} style={styles.vd}>
                  <Text style={styles.vat}>{"view details"}</Text>
                  <Image style={styles.vrs} source={Icons.right_side} />
                </TouchableOpacity>

                <View style={styles.arc}>
                  <Text style={styles.art}>ac repair</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={styles.star1} source={Icons.star} />
                    <Text style={styles.arr}>{" 4.5 (43k)"}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.tc,
                  {
                    borderColor: "#5BE379",
                    marginRight: normalize(10),
                  },
                ]}
              >
                <Image source={Images.call} style={styles.ti} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={[
                  styles.tc,
                  {
                    borderColor: "#F5C443",
                  },
                ]}
              >
                <Image source={Images.chat} style={styles.ti} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.udc, { marginTop: 0, paddingVertical: normalize(10) }]}>
            <View>
              <Text style={styles.otp}>OTP</Text>
              <Text style={styles.otpd}>{"share with service provider\nto start service "}</Text>
            </View>
            <Text style={styles.otpt}>4564</Text>
          </View>

          <View style={styles.sc}>
            <Image source={Images.ac_service} style={styles.si} />
            <View>
              <Text style={[styles.otpt, { fontSize: normalize(12) }]}>AC Service</Text>
              <Text style={styles.st}>{"• 1 hr\n• Includes dummy info"}</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
            <Text style={styles.btnt}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.ws}>
          <Text style={styles.wt}>Jim is on his way 🤘</Text>
          <Text style={styles.wst}>Arriving in {duration.toFixed(0)} mins</Text>
        </View>
      </View>

      <Picker
        children={
          <View>
            <View
              style={[
                styles.udc,
                {
                  justifyContent: "flex-start",
                  marginTop: normalize(15),
                },
              ]}
            >
              <Image source={Icons.user1} style={styles.ui} />
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: normalize(10) }}>
                  <Text style={styles.ut}>Jim Carrey</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={styles.star} source={Icons.star} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={styles.ustt}>{" 4.8 (27) "}</Text>
                      <Image source={Icons.tickmark} style={styles.tmark} />
                      <Text style={styles.ustt}>{" 38 jobs completed"}</Text>
                    </View>
                  </View>
                  <Text style={styles.ustt}>
                    {"member since "}
                    {<Text style={{ color: "#5E17EB" }}>2021</Text>}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rateT}>
              <Text style={styles.rateTitle}>What people say</Text>
              <Image source={Icons.chat2} style={styles.chat} />
            </View>

            <View
              style={{
                height: "72%",
                width: "100%",
              }}
            >
              <FlatList
                data={review}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                  width: "90%",
                  alignSelf: "center",
                  paddingVertical: normalize(20),
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        marginBottom: normalize(15),
                      }}
                    >
                      <Text style={styles.rtitle}>{item.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          {[1, 2, 3, 4, 5].map((i, index) => {
                            return (
                              <Image
                                source={i > parseInt(item.rate) ? Icons.start2 : Icons.star}
                                style={{
                                  marginRight: normalize(5),
                                  height: normalize(12),
                                  width: normalize(12),
                                  resizeMode: "contain",
                                  tintColor: i > parseInt(item.rate) ? undefined : "#F5C443",
                                }}
                              />
                            );
                          })}
                          <Text
                            style={[
                              styles.ustt,
                              {
                                fontFamily: Fonts.Poppins_Medium,
                              },
                            ]}
                          >
                            {item.rate}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.ustt,
                            {
                              color: "#757575",
                            },
                          ]}
                        >
                          {item.time}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.ustt,
                          {
                            marginTop: normalize(5),
                            color: "#757575",
                            fontSize: normalize(11),
                          },
                        ]}
                      >
                        {item.comment}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        }
        isTabLine={true}
        isVisible={isVisibleReview}
        setIsVisible={setIsVisibleReview}
        height={"62%"}
        backdropOpacity={0.8}
      />
    </SafeAreaView>
  );
};

export default ServiceDayInside;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bc: {
    height: normalize(35),
    width: normalize(38),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "android" ? normalize(10) : 0,
  },
  bi: {
    height: normalize(16),
    width: normalize(20),
    resizeMode: "contain",
    marginLeft: normalize(5),
  },
  gps: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: "contain",
    marginLeft: normalize(5),
  },
  bc1: {
    height: normalize(35),
    width: normalize(38),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    right: normalize(10),
    top: Platform.OS == "android" ? normalize(8) : normalize(2),
  },
  ws: {
    backgroundColor: "#333334",
    height: normalize(60),
    width: "90%",
    borderRadius: normalize(15),
    alignSelf: "center",
    position: "absolute",
    top: -normalize(30),
    justifyContent: "center",
    alignItems: "center",
  },
  wt: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.white,
    fontSize: normalize(17),
  },
  wst: {
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.white,
    fontSize: normalize(11),
  },
  udc: {
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: normalize(1),
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: normalize(32),
    paddingVertical: normalize(12),
    justifyContent: "space-between",
  },
  ui: {
    height: normalize(45),
    width: normalize(55),
    resizeMode: "cover",
    borderRadius: normalize(8),
  },
  ut: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: "#161616",
    fontSize: normalize(13),
  },
  ust: {
    fontFamily: Fonts.Poppins_Regular,
    color: "#161616",
    fontSize: normalize(11),
  },
  ustt: {
    fontFamily: Fonts.Poppins_Regular,
    color: "#161616",
    fontSize: normalize(10),
  },
  star: {
    height: normalize(10),
    width: normalize(10),
    tintColor: "#F5C443",
    resizeMode: "contain",
  },
  rt: {
    fontFamily: Fonts.Poppins_Medium,
    color: "#757575",
    fontSize: normalize(8),
    top: normalize(2),
  },
  vd: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(5),
  },
  vat: {
    color: "#6278E8",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(11),
  },
  vrs: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: "contain",
    marginLeft: normalize(5),
  },
  arc: {
    backgroundColor: "#333334",
    borderRadius: normalize(6),
    height: normalize(25),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(10),
    marginTop: normalize(5),
  },
  art: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white,
    fontSize: normalize(10),
    textTransform: "uppercase",
    marginRight: normalize(18),
  },
  star1: {
    height: normalize(11),
    width: normalize(11),
    tintColor: "#F5C443",
    resizeMode: "contain",
  },
  arr: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white,
    fontSize: normalize(9),
  },
  tc: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(30),
    borderWidth: normalize(1.5),
    justifyContent: "center",
    alignItems: "center",
  },
  ti: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: "contain",
  },
  otp: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(13),
  },
  otpd: {
    color: "#757575",
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(11),
  },
  otpt: {
    color: "#161616",
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(13),
  },
  sc: {
    height: normalize(80),
    width: "90%",
    alignSelf: "center",
    borderWidth: normalize(1.5),
    borderColor: "#F3F3F3",
    borderRadius: normalize(10),
    marginTop: normalize(10),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(8),
  },
  si: {
    resizeMode: "cover",
    height: normalize(60),
    width: normalize(70),
    borderRadius: normalize(8),
    marginRight: normalize(10),
  },
  st: {
    color: "#757575",
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(10),
  },
  btn: {
    backgroundColor: Colors.black,
    height: normalize(38),
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(8),
    marginTop: normalize(10),
  },
  btnt: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white,
    fontSize: normalize(13),
  },
  tmark: {
    height: normalize(15),
    width: normalize(15),
    resizeMode: "contain",
  },
  rateT: {
    width: "90%",
    alignSelf: "center",
    marginTop: normalize(15),
    flexDirection: "row",
    alignItems: "center",
  },
  rateTitle: {
    color: "#161616",
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(14),
  },
  chat: {
    resizeMode: "contain",
    height: normalize(17),
    width: normalize(17),
    marginLeft: normalize(15),
  },
  rtitle: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
    marginBottom: normalize(5),
  },
});
