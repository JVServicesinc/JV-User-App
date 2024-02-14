import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../themes/Colors";
import { Images } from "../../themes/Images";
import normalize from "../../utils/helpers/normalize";
import { Icons } from "../../themes/Icons";
import { StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import Picker from "../../components/Picker";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../redux/reducer/AuthReducer";
import { Fonts } from "../../themes/Fonts";
import { deleteAccountRequest } from "../../redux/reducer/UserReducer";
import isInternetConnected from "../../utils/helpers/NetInfo";
import showErrorAlert from "../../utils/helpers/Toast";
import _ from "lodash";
import Loader from "../../utils/helpers/Loader";
import { globalLogout } from "../../redux/reducer/GlobalSlice";
import { StreamChat } from "stream-chat";
import constants from "../../utils/helpers/constants";
import { useTranslation } from "react-i18next";
import { storeData, getData } from "../../redux/LocalStore";

const client = StreamChat.getInstance(constants.GETSTREAM_API_KEY);
const Account = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isOptionsVisible, setIsOptionsVisible] = useState({
    isVisible: false,
    type: "",
  });

  const UserReducer = useSelector((state) => state.UserReducer);
  const userInfo = UserReducer?.userInfo;
  const dispatch = useDispatch();
  const Options = [
    {
      icon: Icons.Mybooking,
      title: "My Booking",
      navigate: "BookingTopTab",
    },
    {
      icon: Icons.Order,
      title: "My Orders",
      navigate: "MyOrders",
    },
    { icon: Icons.Address, title: "Manage Address", navigate: "ManageAddress" },
    { icon: Icons.Refer, title: "Refer & Earn", navigate: "ReferAndEarn" },
    { icon: Icons.BlankStar, title: "Rate us" },
    { icon: Icons.AboutJE, title: "About JEveux", navigate: "AboutJeveux" },
    { icon: Icons.AboutJE, title: "About Us", navigate: "DocumentsDetails" },
    {
      icon: Icons.AboutJE,
      title: "Cancellation Policy",
      navigate: "DocumentsDetails",
    },
    {
      icon: Icons.AboutJE,
      title: "Privacy Policy",
      navigate: "DocumentsDetails",
    },
    {
      icon: Icons.AboutJE,
      title: "Terms and Conditions",
      navigate: "DocumentsDetails",
    },
    {
      icon: Icons.Monitor,
      title: "Rate JEveux Company",
      navigate: "RateJeveuxCompany",
    },
    {
      icon: Icons.ChooseLanguage,
      title: "Choose Language",
      navigate: "ChooseLanguage",
    },
    { icon: Icons.Delete, title: "Delete Account" },
    { icon: Icons.Logout, title: "Logout" },
    { icon: Icons.chat, title: "Chat", navigate: "Message" },
  ];

  const deleteAccount = async (data) => {
    isInternetConnected()
      .then(() => {
        dispatch(deleteAccountRequest(data));
      })
      .catch((err) => {
        showErrorAlert("Please Connect To Internet");
      });
  };

  return (
    <SafeAreaView style={styles.primary}>
      <Loader visible={UserReducer.status == "User/deleteAccountRequest"} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: normalize(18),
        }}
      >
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />

        <View
          style={{
            borderBottomWidth: normalize(1),
            borderBottomColor: Colors.line,
            paddingBottom: normalize(10),
          }}
        >
          <View
            style={{
              ...styles.container,
              marginTop: normalize(18),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={userInfo?.user_profile_image ? { uri: userInfo?.user_profile_image } : Images.Avatar} style={styles.img} />
              <View>
                <Text style={styles.text16}>{userInfo.full_name}</Text>
                <Text style={styles.text11}>
                  {userInfo.country_code} {userInfo.mobile}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.editback}>
              <Image source={Icons.Editixon} style={styles.edit} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.touch}>
            <Image source={Icons.worker} style={styles.workerImg} />
            <Text style={styles.title}>{t("Become A Provider")}</Text>

            <Image
              source={Icons.RightAngle}
              style={{
                ...styles.angle,
                tintColor: Colors.white,
                position: "absolute",
                right: normalize(10),
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            marginTop: '2%',
            width: '100%',
            height: '5%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{
              width: '30%',
              height: '100%',
              borderColor: Colors.black,
              backgroundColor: selectedLangauage.english
                ? Colors.black
                : Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: normalize(1),
              borderRadius: normalize(6),
            }}
            onPress={() => {
              changeLanguage('enUS');
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '500',
                color: selectedLangauage.english ? Colors.white : Colors.black,
              }}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              height: '100%',
              borderColor: Colors.black,
              backgroundColor: selectedLangauage.french
                ? Colors.black
                : Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: normalize(1),
              borderRadius: normalize(6),
            }}
            onPress={() => {
              changeLanguage('frCA');
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '500',
                color: selectedLangauage.french ? Colors.white : Colors.black,
              }}>
              French
            </Text>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={Options}
          style={{ marginTop: normalize(15) }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View animation={"fadeInLeft"} duration={400} delay={index * 50} style={styles.card}>
                <TouchableOpacity
                  onPress={() => {
                    if (item?.navigate) {
                      if (item?.navigate === "DocumentsDetails") {
                        navigation.navigate(item?.navigate, {
                          title: item?.title,
                          data: {
                            url:
                              item?.title === "About Us"
                                ? constants.ABOUT_US
                                : item?.title === "Cancellation Policy"
                                ? constants.CANCELLATION_POLICY
                                : item?.title === "Privacy Policy"
                                ? constants.PRIVACY_POLICY
                                : item?.title === "Terms and Conditions"
                                ? constants.TERMS_AND_CONDITIONS
                                : constants.ABOUT_US,
                          },
                        });
                      } else {
                        navigation.navigate(item?.navigate);
                      }
                    } else if (index == 13) {
                      setIsOptionsVisible({
                        isVisible: true,
                        type: "logout",
                      });
                    } else if (index == 12) {
                      setIsOptionsVisible({
                        isVisible: true,
                        type: "delete account",
                      });
                    }
                  }}
                  style={{
                    ...styles.container,
                    marginVertical: normalize(15),
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={item?.icon}
                      style={[
                        styles.icon,
                        {
                          // tintColor: '#fff',
                        },
                      ]}
                    />
                    <Text
                      style={{
                        fontSize: normalize(14),
                        fontWeight: "500",
                        color: Colors.black,
                        marginLeft: normalize(12),
                      }}
                    >
                      {`${t(item?.title)}`}
                    </Text>
                  </View>
                  <Image
                    source={Icons.RightAngle}
                    style={{
                      ...styles.angle,
                      display: item?.title == "Delete Account" || item?.title == "Logout" ? "none" : "flex",
                    }}
                  />
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Support")} activeOpacity={0.8} style={styles.touchHelp}>
          <Image source={Icons.help} style={styles.helpImg} />
          <Text style={styles.helpTitle}>{t("Help")}</Text>
        </TouchableOpacity>

        <Picker
          children={
            <View style={styles.options}>
              <Text style={styles.title1}>Confirm {isOptionsVisible.type == "logout" ? " Logout ?" : " Delete Account ?"}</Text>
              <Text style={styles.title2}>
                Are you sure you want to
                {isOptionsVisible.type == "logout" ? " logout?" : " delete account ?"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsOptionsVisible({
                    isVisible: false,
                    type: "",
                  });
                  setTimeout(async () => {
                    if (!_.isEmpty(userInfo) && isOptionsVisible.type !== "logout") {
                      let fromdata = new FormData();
                      fromdata.append("email", userInfo?.email);
                      deleteAccount(fromdata);
                    } else {
                      dispatch(logoutRequest());
                      dispatch(globalLogout());
                      await client.disconnectUser();
                    }
                  }, 600);
                }}
                style={styles.touch2}
              >
                <Text style={styles.btnTitle}>{isOptionsVisible.type == "logout" ? "LogOut" : "Delete Account"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setIsOptionsVisible({
                    isVisible: false,
                    type: "",
                  })
                }
                style={[
                  styles.touch2,
                  {
                    backgroundColor: Colors.card_text,
                  },
                ]}
              >
                <Text style={styles.btnTitle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          }
          isTabLine={true}
          isVisible={isOptionsVisible.isVisible}
          setIsVisible={() =>
            setIsOptionsVisible({
              isVisible: false,
              type: "",
            })
          }
          height={"40%"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imgback: {
    backgroundColor: Colors.yellow,
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    justifyContent: "center",
    alignItems: "center",
    marginRight: normalize(12),
  },
  img: {
    backgroundColor: Colors.yellow,
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
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
  text16: {
    fontSize: normalize(16),
    fontWeight: "600",
    color: Colors.black,
  },
  text11: {
    fontSize: normalize(11),
    fontWeight: "400",
    color: Colors.black,
  },
  editback: {
    backgroundColor: Colors.gray,
    height: normalize(36),
    width: normalize(36),
    borderRadius: normalize(14),
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: "contain",
  },
  icon: {
    height: normalize(22),
    width: normalize(22),
    resizeMode: "contain",
  },
  angle: {
    height: normalize(12),
    width: normalize(7),
    resizeMode: "contain",
  },
  touch: {
    backgroundColor: Colors.black,
    height: normalize(44),
    alignItems: "center",
    borderRadius: normalize(8),
    marginTop: normalize(10),
    flexDirection: "row",
    paddingHorizontal: normalize(10),
  },
  title: {
    fontSize: normalize(14),
    fontWeight: "400",
    color: Colors.white,
  },
  workerImg: {
    tintColor: Colors.white,
    height: normalize(22),
    width: normalize(22),
    resizeMode: "contain",
    marginRight: normalize(10),
  },
  helpImg: {
    tintColor: Colors.white,
    height: normalize(22),
    width: normalize(22),
    resizeMode: "contain",
  },
  helpTitle: {
    fontSize: normalize(13),
    fontWeight: "600",
    color: Colors.white,
    marginTop: normalize(1.5),
  },
  touchHelp: {
    backgroundColor: Colors.tealish_green,
    height: normalize(62),
    width: normalize(62),
    position: "absolute",
    bottom: normalize(20),
    right: normalize(18),
    borderRadius: normalize(70),
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: normalize(3),
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: normalize(8),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: normalize(12),
  },
  options: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    marginTop: normalize(20),
  },
  title1: {
    color: Colors.black,
    fontFamily: Fonts.Poppins_SemiBold,
    marginBottom: normalize(20),
    fontSize: normalize(18),
  },
  touch2: {
    backgroundColor: Colors.black,
    height: normalize(43),
    alignSelf: "center",
    borderRadius: normalize(30),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalize(15),
    width: "100%",
  },
  btnTitle: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white,
    fontSize: normalize(14),
  },
  title2: {
    color: Colors.davy_grey,
    fontFamily: Fonts.Poppins_Medium,
    marginBottom: normalize(25),
    fontSize: normalize(14),
    textAlign: "left",
    width: "90%",
    alignSelf: "flex-start",
  },
});
