import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, FlatList, StatusBar } from "react-native";
import React, { useState } from "react";
import normalize from "../../utils/helpers/normalize";
import { Icons } from "../../themes/Icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
const { width, height } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../../redux/reducer/AuthReducer";
import showErrorAlert, { ShowToast } from "../../utils/helpers/Toast";
import isInternetConnected from "../../utils/helpers/NetInfo";
import Modal from "react-native-modal";
import { Fonts } from "../../themes/Fonts";
import { Colors } from "../../themes/Colors";
import Loader from "../../utils/helpers/Loader";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { checkAccount } from "../../services/Endpoints";
import { navigate } from "../../utils/helpers/RootNavigation";

let status = "";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthReducer = useSelector((state) => state.AuthReducer);

  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errmsg, setErrMsg] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(true);

  let nameCheck = /^[a-zA-Z ]{0,100}$/;
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneNum = /^(?![.-])\d{10,}$/;

  const handleSignup = async () => {
    if (username.trim() == "") {
      setUserError(true);
      setErrMsg(t("empty_name"));
    } else if (!nameCheck.test(username)) {
      setUserError(true);
      setErrMsg(t("valid_name"));
    } else if (number.trim() == "") {
      setPhoneError(true);
      setErrMsg(t("empty_phone_number"));
    } else if (!phoneNum.test(number)) {
      setPhoneError(true);
      setErrMsg(t("valid_phone_number"));
    } else if (email.trim() == "") {
      setEmailError(true);
      setErrMsg(t("empty_email"));
    } else if (!regex.test(email)) {
      setEmailError(true);
      setErrMsg(t("enter_valid_email"));
    } else if (password.trim() == "") {
      setPassError(true);
      setErrMsg(t("empty_password"));
    } else if (password.length < 8) {
      setPassError(true);
      setErrMsg(t("minmum_enter_password"));
    } else {
      let fromdata = new FormData();
      fromdata.append("full_name", username);
      fromdata.append("mobile", number);
      fromdata.append("country_code", countryCode);
      fromdata.append("email", email.toLocaleLowerCase().trim());
      fromdata.append("password", password);
      fromdata.append("fcm_id", null);

      let checkAccountData = new FormData();
      checkAccountData.append("email", email.toLocaleLowerCase().trim());

      try {
        const response = await checkAccount(checkAccountData);
        if (response?.data) {
          const data = response?.data?.data;
          if (data) {
            if (data?.is_email_verified) {
              navigate("Login", { email: email.toLocaleLowerCase().trim() });
              ShowToast(t("user_exist"));
            } else {
              register(fromdata);
            }
          } else {
            register(fromdata);
          }
        }
      } catch (error) {
        console.log(error);
        ShowToast(t("errorcodes.E500"));
      }
    }
  };

  function register(obj) {
    isInternetConnected()
      .then(() => {
        dispatch(signupRequest(obj));
      })
      .catch((err) => {
        showErrorAlert(t("no_internet"));
      });
  }

  const countryList = [
    {
      flag: Icons.india,
      code: "+91",
    },
    {
      flag: Icons.canada,
      code: "+1",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#191919"} barStyle={"light-content"} />
      <Loader visible={AuthReducer.status == "Auth/signupRequest"} />
      <View style={styles.bg}>
        <Image source={Icons.Applogo} style={styles.img} />
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <KeyboardAwareScrollView>
        <View style={styles.main}>
          <Animatable.View animation={"fadeInUp"} duration={800} delay={300} style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.h1}>{t("create_account")}</Text>

              <View style={styles.middle}>
                <View style={styles.subcon}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      borderColor: userError ? "red" : "#ccc",
                    }}
                  >
                    <Image source={Icons.User} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder={t("name")}
                      placeholderTextColor={"gray"}
                      onChangeText={(text) => {
                        setUserError(false), setUsername(text);
                      }}
                      value={username}
                      keyboardType="default"
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.errortxt,
                      display: userError ? "flex" : "none",
                    }}
                  >
                    {errmsg}
                  </Text>
                </View>

                <View style={styles.subcon}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      borderColor: phoneError ? "red" : "#ccc",
                    }}
                  >
                    <Image source={Icons.Phone} style={styles.icon} />
                    <TouchableOpacity
                      onPress={() => setIsVisible(true)}
                      style={{
                        paddingHorizontal: normalize(5),
                        height: normalize(35),
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_Regular,
                        }}
                      >
                        {countryCode}
                      </Text>
                      <Image
                        source={Icons.down_arrow}
                        style={{
                          height: normalize(10),
                          width: normalize(10),
                          resizeMode: "contain",
                          tintColor: "gray",
                          marginLeft: normalize(5),
                        }}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.input}
                      placeholder={t("mobile_number")}
                      placeholderTextColor={"gray"}
                      onChangeText={(text) => {
                        setPhoneError(false), setNumber(text);
                      }}
                      value={number}
                      keyboardType="number-pad"
                      maxLength={10}
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.errortxt,
                      display: phoneError ? "flex" : "none",
                    }}
                  >
                    {errmsg}
                  </Text>
                </View>

                <View style={styles.subcon}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      borderColor: emailError ? "red" : "#ccc",
                    }}
                  >
                    <Image source={Icons.Email} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder={t("email_address")}
                      placeholderTextColor={"gray"}
                      onChangeText={(text) => {
                        setEmailError(false), setEmail(text);
                      }}
                      value={email}
                      keyboardType="email-address"
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.errortxt,
                      display: emailError ? "flex" : "none",
                    }}
                  >
                    {errmsg}
                  </Text>
                </View>

                <View style={styles.subcon}>
                  <View
                    style={{
                      ...styles.inputContainer,
                      borderColor: passError ? "red" : "#ccc",
                    }}
                  >
                    <Image source={Icons.Lock} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder={t("password")}
                      placeholderTextColor={"gray"}
                      secureTextEntry={isPassVisible}
                      value={password}
                      onChangeText={(text) => {
                        setPassError(false), setPassword(text);
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => setIsPassVisible(!isPassVisible)}
                      style={{
                        height: normalize(30),
                        width: normalize(30),
                        marginLeft: normalize(5),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={isPassVisible ? Icons.visible : Icons.invisible}
                        style={{
                          resizeMode: "contain",
                          height: normalize(16),
                          width: normalize(16),
                          tintColor: "gray",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      ...styles.errortxt,
                      display: passError ? "flex" : "none",
                    }}
                  >
                    {errmsg}
                  </Text>
                </View>

                <View style={styles.btn}>
                  <TouchableOpacity onPress={() => handleSignup()} style={styles.button}>
                    <Image source={Icons.RightArrow} style={styles.arrow} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.btm}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  {t("already_have_an_account")}
                  <Text onPress={() => navigation.navigate("Login")} style={{ color: "#161616", fontWeight: "bold" }}>
                    {" "}
                    {t("sign_in")}
                  </Text>
                </Text>
              </View>
            </View>
          </Animatable.View>
        </View>
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}

      <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={isVisible}
        style={{
          width: "100%",
          alignSelf: "center",
          margin: 0,
        }}
        animationInTiming={600}
        animationOutTiming={800}
        backdropOpacity={0.3}
        backdropColor={Colors.black}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
      >
        <View style={styles.mainContainer}>
          <FlatList
            data={countryList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCountryCode(item.code);
                    setIsVisible(false);
                  }}
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    height: normalize(45),
                    borderBlockColor: Colors.border,
                    borderBottomWidth: normalize(1),
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: normalize(10),
                  }}
                >
                  <Image
                    source={item.flag}
                    style={{
                      resizeMode: "contain",
                      height: normalize(30),
                      width: index == 1 ? normalize(26) : normalize(30),
                      left: index == 1 ? 0 : -3,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color: Colors.black,
                      fontFamily: Fonts.Poppins_Regular,
                    }}
                  >
                    {item.code}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#191919",
    position: "absolute",
    width: width,
    height: height * 0.6,
    borderBottomLeftRadius: normalize(30),
    borderBottomRightRadius: normalize(30),
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: normalize(16),
    width: width * 0.7,
    alignSelf: "center",
  },
  input: {
    flex: 1,
    height: normalize(35),
    paddingLeft: 10,
    color: "black",
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Regular,
  },
  icon: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: "contain",
    tintColor: "gray",
    marginRight: normalize(5),
  },
  arrow: {
    height: normalize(14),
    width: normalize(16),
    resizeMode: "contain",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: normalize(15),
  },
  container: {
    width: width * 0.8,
    marginTop: width * 0.8,
  },
  card: {
    paddingVertical: normalize(20),
    backgroundColor: "#fff",
    borderRadius: normalize(15),
  },
  h1: {
    fontSize: normalize(24),
    fontWeight: "bold",
    color: "black",
    marginLeft: normalize(15),
    lineHeight: normalize(24),
  },
  h2: {
    marginTop: 5,
    fontSize: 20,
  },
  middle: {
    marginTop: 30,
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(8),
  },
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#040404",
    justifyContent: "center",
    alignItems: "center",
  },
  btm: {
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  img: {
    height: normalize(142),
    width: normalize(142),
    resizeMode: "contain",
    marginTop: normalize(60),
  },
  errortxt: {
    fontSize: normalize(10),
    fontWeight: "500",
    alignSelf: "flex-end",
    color: "red",
    position: "absolute",
    top: normalize(38),
  },
  subcon: { width: width * 0.7, alignSelf: "center" },
  mainContainer: {
    backgroundColor: Colors.white,
    height: "30%",
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
