import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Colors } from "../../themes/Colors";
import { Images } from "../../themes/Images";
import normalize from "../../utils/helpers/normalize";
import { Icons } from "../../themes/Icons";
import { StatusBar } from "react-native";
import { useState } from "react";
import { Fonts } from "../../themes/Fonts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import FlatListSlider from "../../components/slider/FlatListSlider";
import Preview from "../../components/slider/Preview";
import Picker from "../../components/Picker";
import SelectALocation from "../all/SelectALocation";
import { useDispatch, useSelector } from "react-redux";
import isInternetConnected from "../../utils/helpers/NetInfo";
import { getUserInfoRequest } from "../../redux/reducer/UserReducer";
import showErrorAlert, { ShowToast } from "../../utils/helpers/Toast";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import _ from "lodash";
import { getAllServiceCateRequest, getAllServiceWishlistRequest, getCartItemsRequest } from "../../redux/reducer/ServiceReducer";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { setWarningShownStatus } from "../../redux/reducer/GlobalSlice";
import { navigate } from "../../utils/helpers/RootNavigation";
import { getCartData } from "../../services/Endpoints";
// Global
global.selectedServiceCategory = {};
global.selectedStoreCategory = {};

const Home = () => {
  const { height, width } = useWindowDimensions();
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { isWarningShown, cartData } = useSelector((state) => state.GlobalReducer);

  const { token } = useSelector((state) => state.AuthReducer);
  const UserReducer = useSelector((state) => state.UserReducer);
  const ServiceReducer = useSelector((state) => state.ServiceReducer);
  const userInfo = UserReducer?.userInfo;
  const [isLoading, setIsLoading] = useState(true);
  const [isNotify, setIsNotify] = useState(false);

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [cartItemCount, setCartItemCount] = useState(0);

  const [warningCount, setWarningCount] = useState(10);
  let count = 10;

  useEffect(() => {
    if (!isWarningShown) {
      const warningCounter = setInterval(() => getTime(count), 1000);
      const getTime = (ct) => {
        setWarningCount(ct);

        if (count > 0) {
          count = count - 1;
        } else {
          clearInterval(warningCounter);
          count = 10;
        }
      };

      return () => clearInterval(warningCounter);
    }
  }, []);

  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getUserInfoRequest());
        dispatch(getAllServiceCateRequest());
        dispatch(getAllServiceWishlistRequest());
      })
      .catch((err) => {
        showErrorAlert("Please Connect To Internet");
      });
  }, []);

  useEffect(() => {
    if (ServiceReducer?.cartId !== "") {
      isInternetConnected()
        .then(() => {
          dispatch(getCartItemsRequest({ id: ServiceReducer?.cartId }));
        })
        .catch((err) => {
          showErrorAlert("Please Connect To Internet");
        });
    }
  }, [ServiceReducer?.cartId]);

  let firstName = !_.isEmpty(userInfo) ? userInfo?.full_name.split(" ")[0] : "";

  const Categories = [
    { icon: Icons.Women_salon, title: "Women salon" },
    { icon: Icons.Mens_salon, title: `Men's salon` },
    { icon: Icons.air_conditioner, title: "AC Service" },
    { icon: Icons.Cleaning, title: "Cleaning" },
    { icon: Icons.Electrician, title: `Electrician` },
    { icon: Icons.Home_painting, title: "Home painting" },
  ];

  const Noteworthy = [
    { icon: Icons.water_purifier, title: `Water Purifier` },
    { icon: Icons.air_purifier, title: "Air Purifier" },
    { icon: Icons.home_paint, title: "Home painting" },
    { icon: Icons.home_paint, title: "Home painting" },
  ];

  const Salon = [
    { icon: Images.haircut, title: `Haircut` },
    { icon: Images.hair_color, title: "Hair color" },
    { icon: Images.hair_color, title: "Hair color" },
  ];

  const Massage = [
    { icon: Images.streess_relief, title: `Stress relief` },
    { icon: Images.pain_rellef, title: "Pain rellef" },
    { icon: Images.hair_color, title: "Relaxation" },
  ];

  const Service = [
    { icon: Images.water_purifire_service, title: "Water Purifier Service" },
    { icon: Images.washing_machine, title: "Washing Machine" },
    { icon: Images.washing_machine, title: "Washing Machine" },
  ];

  const SalonForWoman = [
    { icon: Images.waxing, title: "Waxing" },
    { icon: Images.facial, title: "Facial & Cleanup " },
    { icon: Images.facial, title: "Facial" },
  ];

  const MostBookedServices = [
    {
      icon: Images.instance_cleaning,
      title: "Intense bathroom cleaning",
      rate: 4.73,
      total_rate: "427.9k",
      price: "58.00",
    },
    {
      icon: Images.classic_cleaning,
      title: "Classic bathroom cleaning",
      rate: 4.73,
      total_rate: "427.9k",
      price: "58.00",
    },
    {
      icon: Images.classic_cleaning,
      title: "Intense bathroom cleaning",
      rate: 4.73,
      total_rate: "427.9k",
      price: "58.00",
    },
  ];

  const CardItem = useCallback(({ item, index, containerStyle, onPress }) => {
    return (
      <Animatable.View animation={"fadeInRight"} duration={800} delay={index * 300} style={[containerStyle]}>
        <TouchableOpacity style={styles.card} onPress={onPress}>
          <Image source={item?.icon} style={styles.card_icon} />
          <Text style={styles.card_text}>{item?.title}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, []);

  function CategoryList({ title, data }) {
    return (
      <>
        <View style={[styles.titlecon, { marginTop: 0, paddingHorizontal: normalize(18) }]}>
          <Text style={styles.roboto17}>{title}</Text>
          <TouchableOpacity>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginTop: normalize(12),
            paddingHorizontal: normalize(18),
          }}
          numColumns={3}
          renderItem={({ item, index }) => {
            return <CardItem item={item} index={index} />;
          }}
        />
      </>
    );
  }

  function SingleHList({ title, data, style, onPress }) {
    return (
      <>
        <View style={[styles.titlecon, style]}>
          <Text style={styles.roboto17}>{title}</Text>
          <TouchableOpacity>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingStart: normalize(18),
          }}
          renderItem={({ item, index }) => {
            return <CardItem item={item} index={index} containerStyle={{ marginRight: normalize(14) }} onPress={onPress} />;
          }}
        />
      </>
    );
  }

  function SingleHRList({ onPress, title, data, subtitle, style, titleBottom = false }) {
    return (
      <>
        <View style={[styles.titlecon, style]}>
          <View>
            <Text style={styles.roboto17}>{title}</Text>
            {subtitle && <Text style={styles.roboto18}>{subtitle}</Text>}
          </View>
          <TouchableOpacity onPress={onPress}>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingStart: normalize(18) }}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View animation={"fadeInRight"} duration={800} delay={index * 300}>
                <TouchableOpacity style={styles.card1}>
                  {!titleBottom && <Text style={styles.card_text1}>{item.title}</Text>}
                  <Image
                    source={item?.icon}
                    style={{
                      height: normalize(80),
                      width: "100%",
                      marginTop: normalize(5),
                      borderRadius: normalize(6),
                      resizeMode: "contain",
                    }}
                  />
                  {titleBottom && (
                    <Text
                      style={[
                        styles.card_text1,
                        {
                          textAlign: "center",
                          marginTop: normalize(5),
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
      </>
    );
  }

  function SingleHMList({ title, data, style }) {
    return (
      <>
        <View style={[styles.titlecon, style]}>
          <Text style={styles.roboto17}>{title}</Text>
          <TouchableOpacity>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingStart: normalize(18) }}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View animation={"fadeInRight"} duration={800} delay={index * 300}>
                <TouchableOpacity
                  style={[
                    styles.card1,
                    {
                      height: normalize(185),
                    },
                  ]}
                >
                  <Image
                    source={item?.icon}
                    style={{
                      height: normalize(80),
                      width: "100%",
                      marginTop: normalize(5),
                      borderRadius: normalize(6),
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={[
                      styles.card_text1,
                      {
                        textAlign: "center",
                        marginTop: normalize(5),
                      },
                    ]}
                  >
                    {item.title}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginTop: normalize(3),
                    }}
                  >
                    <Image
                      source={Icons.rate_star}
                      style={{
                        resizeMode: "contain",
                        height: normalize(16),
                        width: normalize(16),
                      }}
                    />
                    <Text style={styles.card_text1}>{" " + item.rate + " "}</Text>
                    <Text style={styles.card_text1}>{`(${item.total_rate})`}</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: normalize(26),
                      justifyContent: "center",
                      borderRadius: normalize(10),
                      marginTop: normalize(5),
                    }}
                  >
                    <Text
                      style={[
                        styles.card_text1,
                        {
                          textAlign: "center",
                        },
                      ]}
                    >
                      ${item.price}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
      </>
    );
  }

  const cards = [
    {
      image: Images.Banner,
      desc: "",
    },
    {
      image: Images.Banner,
      desc: "",
    },
    {
      image: Images.Banner,
      desc: "",
    },
    {
      image: Images.Banner,
      desc: "",
    },
    {
      image: Images.Banner,
      desc: "",
    },
  ];

  function LoadingSkeleton({ num }) {
    return (
      <>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={"90%"}
            alignSelf="center"
            flexDirection="row"
            alignItems="center"
            marginTop={normalize(8)}
            justifyContent="space-between"
          >
            <SkeletonPlaceholder.Item width={200} height={20} />
            <SkeletonPlaceholder.Item width={30} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        <SkeletonPlaceholder.Item width={5} height={5} />

        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={"90%"}
            alignSelf="center"
            flexDirection="row"
            alignItems="center"
            marginTop={normalize(8)}
            justifyContent="space-between"
          >
            <SkeletonPlaceholder.Item width={!num ? 105 : 170} height={!num ? 105 : 170} borderRadius={8} />
            <SkeletonPlaceholder.Item width={!num ? 105 : 170} height={!num ? 105 : 170} borderRadius={8} />
            {!num ? <SkeletonPlaceholder.Item width={105} height={105} borderRadius={8} /> : null}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </>
    );
  }

  function LoadingSliderSkeleton() {
    return (
      <>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{
            marginVertical: normalize(15),
          }}
          horizontal
        >
          {[1, 2, 3].map(({ item, index }) => {
            return (
              <SkeletonPlaceholder borderRadius={8}>
                <View
                  style={{
                    width: normalize(250),
                    height: normalize(90),
                    backgroundColor: "red",
                    marginLeft: normalize(15),
                  }}
                />
              </SkeletonPlaceholder>
            );
          })}
        </ScrollView>
      </>
    );
  }

  useEffect(() => {
    // if (UserReducer.status == 'User/getUserInfoSuccess') {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 2000);
    // }
  }, []);

  // --------------------------------------------------------------------------------
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  function SHList({ title, data, item, style }) {
    let serviceId = item?.id;

    return (
      <>
        <View style={[styles.titlecon, style]}>
          <Text style={styles.roboto17}>{title}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewAllServices", {
                title: title,
                item: item,
              })
            }
          >
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            paddingStart: normalize(18),
          }}
          renderItem={({ item, index }) => {
            return <CItem id={serviceId} item={item} index={index} containerStyle={{ marginRight: normalize(14) }} />;
          }}
        />
      </>
    );
  }

  const CItem = useCallback(({ id, item, index, containerStyle }) => {
    let isValidImage = true;

    return (
      <Animatable.View animation={"fadeInRight"} duration={800} delay={index * 300} style={[containerStyle]}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            global.selectedServiceCategory = item;
            navigation.navigate("ViewServiceCategory", {
              cateId: id,
              id: item?.id,
              title: item?.name,
            });
          }}
        >
          <Image source={isValidImage ? { uri: item?.image_url } : Icons.Applogo} style={styles.card_icon} />
          <Text style={styles.card_text}>{item?.name}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, []);

  // --------------------------------------------------------------------------------
  const renderItem = useCallback(({ item, index }) => {
    return (
      <SHList
        title={`${item?.name} services`}
        data={item?.jv_service_categories}
        item={item}
        style={{
          paddingHorizontal: normalize(18),
        }}
      />
    );
  }, []);

  return (
    <>
      <SafeAreaView style={styles.primary}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <FlatList
          contentContainerStyle={{
            paddingBottom: normalize(30),
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: "white",
                paddingBottom: normalize(5),
                paddingHorizontal: normalize(18),
              }}
            >
              <SkeletonPlaceholder borderRadius={4} enabled={UserReducer.status == "User/getUserInfoRequest"}>
                <View style={{ ...styles.container, marginTop: normalize(24) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={userInfo?.user_profile_image ? { uri: userInfo?.user_profile_image } : Images.Avatar}
                      style={styles.img}
                    />
                    <View>
                      <Text style={styles.text14}>Hi, {firstName ? firstName : ""}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setIsVisible(true);
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          margin: isLoading ? normalize(2) : 0,
                        }}
                      >
                        <Image source={Icons.Location} style={styles.location} />
                        <Text
                          numberOfLines={1}
                          style={{
                            ...styles.text11,
                            width: normalize(150),
                            marginLeft: normalize(2),
                          }}
                        >
                          {!_.isEmpty(UserReducer?.currentPosition) ? UserReducer?.currentPosition?.address : "Please Select your location"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onLongPress={() => setIsNotify(!isNotify)}
                    style={[styles.editback, { position: "relative" }]}
                    onPress={() => navigate("ServiceSummary")}
                  >
                    <Image source={Icons.Order} style={styles.edit} />
                    {cartData?.items?.length > 0 ? (
                      <View
                        style={{
                          height: 20,
                          backgroundColor: Colors.black,
                          width: 20,
                          position: "absolute",
                          borderRadius: 10,
                          overflow: "hidden",
                          alignItems: "center",
                          justifyContent: "center",
                          top: 4,
                          right: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: Colors.white,
                          }}
                        >
                          {/* {cartData?.items?.length || 0}  //App Crashing in this line */}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                </View>

                <View style={styles.scontainer}>
                  <Image source={Icons.Search} style={styles.searchicon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Search for services"
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </SkeletonPlaceholder>
            </View>
          }
          ListFooterComponent={
            (console.log("Status --- ", ServiceReducer.isCategoryLoading),
            (
              <View
                style={{
                  backgroundColor: "white",
                  paddingBottom: normalize(5),
                  paddingHorizontal: normalize(5),
                }}
              >
                {ServiceReducer.isCategoryLoading ? (
                  <>
                    {[1, 2, 3, 4].map((item, index) => {
                      return <LoadingSkeleton key={index} />;
                    })}
                  </>
                ) : (
                  <FlatList
                    data={ServiceReducer?.getAllServiceCateRes}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                  />
                )}
              </View>
            ))
            // {/* {ServiceReducer.status === "Service/getAllServiceCateRequest" ? (
            //   <>
            // {[1, 2, 3].map((item, index) => {
            //   return <LoadingSkeleton key={index} />;
            // })}
            //   </>
            // ) : (
            //   <FlatList
            //     data={ServiceReducer?.getAllServiceCateRes}
            //     keyExtractor={keyExtractor}
            //     showsVerticalScrollIndicator={false}
            //     renderItem={renderItem}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSliderSkeleton />
            // ) : (
            //   <FlatListSlider
            //     data={cards}
            //     width={275}
            //     timer={4000}
            //     component={<Preview />}
            //     onPress={(item) => {}}
            //     indicatorActiveWidth={40}
            //     contentContainerStyle={{
            //       marginBottom: 20,
            //       marginTop: 20,
            //       paddingHorizontal: 22,
            //     }}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton />
            // ) : (
            //   <CategoryList data={Categories} title={"Categories"} />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSliderSkeleton />
            // ) : (
            //   <FlatListSlider
            //     data={cards}
            //     width={275}
            //     timer={4000}
            //     component={<Preview />}
            //     onPress={(item) => {}}
            //     indicatorActiveWidth={40}
            //     contentContainerStyle={{
            //       marginBottom: 20,
            //       marginTop: 20,
            //       paddingHorizontal: 22,
            //     }}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton />
            // ) : (
            //   <SingleHList
            //     title={"New and Noteworthy"}
            //     data={Noteworthy}
            //     style={{
            //       marginTop: normalize(5),
            //       paddingHorizontal: normalize(18),
            //     }}
            //     onPress={() => {
            //       navigation.navigate("ServiceDayInside");
            //     }}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton num={2} />
            // ) : (
            //   <SingleHMList
            //     title={"Most booked services"}
            //     data={MostBookedServices}
            //     style={{
            //       marginTop: normalize(15),
            //       paddingHorizontal: normalize(18),
            //     }}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton num={2} />
            // ) : (
            //   <SingleHRList
            //     title={"Salon for women"}
            //     data={SalonForWoman}
            //     style={{ paddingHorizontal: normalize(18) }}
            //     onPress={() => navigation.navigate("")}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton num={2} />
            // ) : (
            //   <SingleHRList
            //     title={"Appliance Repair & Service"}
            //     titleBottom={true}
            //     data={Service}
            //     style={{ paddingHorizontal: normalize(18) }}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton num={2} />
            // ) : (
            //   <SingleHRList
            //     title={"Salon for men"}
            //     subtitle={"Grooming essentials"}
            //     data={Salon}
            //     style={{ paddingHorizontal: normalize(18) }}
            //   />
            // )} */}

            // {/* {!isLoading ? (
            //   <LoadingSkeleton num={2} />
            // ) : (
            //   <SingleHRList
            //     title={"Massage for men"}
            //     subtitle={"Curated massages by top therapists."}
            //     data={Massage}
            //     style={{ paddingHorizontal: normalize(18) }}
            //   />
            // )} */}
          }
        />
        {isNotify && (
          <View style={styles.nc}>
            <Image source={Icons.user1} style={styles.nci} />
            <View>
              <Text style={styles.ntitle}>Jim is on his way for AC Service</Text>
              <Text style={styles.ntd}>Arriving in 12 mins</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ServiceDayInside")} style={styles.nt}>
              <Image source={Icons.right_arrow} style={styles.nra} />
            </TouchableOpacity>
          </View>
        )}
        <Picker
          children={
            <SelectALocation
              onPress={() => {
                setIsVisible(false);
                setTimeout(() => {
                  navigation.navigate("Location");
                }, 600);
              }}
            />
          }
          isTabLine={true}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          height="86%"
        />
      </SafeAreaView>
      <Modal isVisible={!isWarningShown} animationIn="bounceInUp" animationInTiming={1000} backdropColor="rgba(255,255,255,0.8)">
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
              padding: 20,
              borderRadius: 30,
            }}
          >
            <LottieView source={Icons.Warning} style={{ height: 80, width: 80 }} autoPlay={true} />
            <Text style={styles.warningTitleText}>{t("warning.title")}</Text>
            <Text style={styles.warningHeaderText}>{t("warning.header")}</Text>
            <Text style={styles.warningBodyText}>{t("warning.body")}</Text>

            {warningCount === 0 ? (
              <Text style={styles.warningButtonText} onPress={() => dispatch(setWarningShownStatus(true))}>
                {t("close")}
              </Text>
            ) : (
              <Text style={styles.warningCounterText}>{warningCount}</Text>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imgback: {
    backgroundColor: Colors.yellow,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(14),
    justifyContent: "center",
    alignItems: "center",
    marginRight: normalize(12),
  },
  img: {
    backgroundColor: Colors.yellow,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(14),
    justifyContent: "center",
    alignItems: "center",
    marginRight: normalize(12),
    resizeMode: "contain",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text14: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
  },
  text11: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.black,
  },
  warningTitleText: {
    fontSize: normalize(16),
    fontFamily: Fonts.Poppins_ExtraBold,
    color: Colors.black,
  },
  warningHeaderText: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.red,
    textAlign: "center",
    marginBottom: 12,
  },
  warningBodyText: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
  },
  warningButtonText: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
    backgroundColor: Colors.yellow,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    overflow: "hidden",
  },
  warningCounterText: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editback: {
    backgroundColor: Colors.gray,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(14),
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: "contain",
  },
  location: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: "contain",
    right: normalize(2),
  },
  input: {
    color: Colors.black,
    flex: 1,
  },
  searchicon: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: "contain",
    marginLeft: normalize(10),
  },
  scontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: normalize(18),
    height: normalize(40),
  },
  roboto17: {
    fontSize: normalize(17),
    color: Colors.black,
    fontFamily: Fonts.Roboto_Medium,
  },
  roboto18: {
    fontSize: normalize(14),
    color: Colors.grey_cloud,
    fontFamily: Fonts.Roboto_Regular,
  },
  titlecon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: normalize(16),
    marginBottom: normalize(12),
  },
  allicon: {
    height: normalize(9),
    width: normalize(20),
    resizeMode: "contain",
  },
  card_icon: {
    height: normalize(40),
    width: normalize(40),
    resizeMode: "contain",
  },
  card_text: {
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(8),
    color: Colors.card_text,
    marginTop: normalize(4),
    width: "90%",
    textAlign: "center",
  },
  card_text1: {
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(12),
    color: Colors.davy_grey,
  },
  card: {
    height: normalize(80),
    width: normalize(85),
    borderRadius: normalize(15),
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  card1: {
    height: normalize(120),
    width: normalize(150),
    borderRadius: normalize(15),
    backgroundColor: Colors.gray,
    marginRight: normalize(12),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
  },
  containerauto: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(20),
    marginHorizontal: normalize(18),
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#161616",
    width: normalize(25),
  },
  notify: {
    height: normalize(7),
    width: normalize(7),
    backgroundColor: "red",
    borderRadius: normalize(10),
    position: "absolute",
    right: normalize(12),
    top: normalize(8),
  },
  nc: {
    backgroundColor: "#F2EBFF",
    width: "100%",
    height: normalize(48),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(12),
  },
  nci: {
    height: normalize(30),
    width: normalize(38),
    borderRadius: normalize(6),
    marginRight: normalize(8),
  },
  nt: {
    height: normalize(30),
    width: normalize(38),
    borderRadius: normalize(6),
    marginRight: normalize(8),
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: normalize(5),
  },
  nra: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: "contain",
  },
  ntitle: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(11),
  },
  ntd: {
    color: "#161616",
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(9),
  },
});
