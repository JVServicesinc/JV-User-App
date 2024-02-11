import { changeLanguage } from "i18next";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import normalize from "../../utils/helpers/normalize";
import constants from "../../utils/helpers/constants";
import i18n from "../../utils/helpers/i18n.config";
import { getData, storeData } from "../../redux/LocalStore";
import { setLanguage } from "../../redux/reducer/LanguageReducer";
import { useDispatch } from "react-redux";
import { setStart } from "../../redux/reducer/AuthReducer";
import LottieView from "lottie-react-native";
import { Icons } from "../../themes/Icons";
import { Colors } from "../../themes/Colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: 'green',
  },
  subContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: 'green',
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'orange',
  },
  lottieStyle: { height: "100%", width: "100%" },
  logoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    position: "absolute",
    top: "58%",
    left: "42%",
    height: "9%",
    width: "18%",
  },
  detailsContainer: {
    width: "100%",
    height: "40%",
    // backgroundColor: 'blue',
  },
});

export const LanguageSelector = () => {
  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState<{
    english: boolean;
    french: boolean;
  }>({
    english: true,
    french: false,
  });

  const changeLanguage = (language: string) => {
    setSelectedLanguage({
      english: language === "enUS",
      french: language === "frCA",
    });
    storeData(constants.LANGUAGE, language, () => {
      i18n.changeLanguage(language);
    });
  };

  const continueAction = async () => {
    storeData(constants.STARTING, "1");
    dispatch(setLanguage(true));
    dispatch(setStart("1"));
  };

  useEffect(() => {
    getData(constants.LANGUAGE, (value) => {
      if (value === "" || value === undefined || value === null) {
        storeData(constants.LANGUAGE, "enUS", () => {
          i18n.changeLanguage("enUS");
        });
      } else {
        i18n.changeLanguage(value);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.subContainer}>
          <View style={styles.imageContainer}>
            <LottieView
              source={Icons.Language_Prefer}
              style={styles.lottieStyle}
              autoPlay={true}
            />
            <View style={styles.logoContainer}>
              <Image source={Icons.Applogo} style={styles.logoImage} />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View
              style={{
                marginTop: "2%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: normalize(15),
                  fontWeight: "500",
                  color: Colors.black,
                }}
              >
                What language do you prefer?
              </Text>
              <TouchableOpacity
                style={{
                  width: "35%",
                  height: "20%",
                  marginTop: "2%",
                  borderColor: Colors.black,
                  backgroundColor: selectedLanguage.english
                    ? Colors.black
                    : Colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: normalize(1),
                  borderRadius: normalize(6),
                }}
                onPress={() => {
                  changeLanguage("enUS");
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: "500",
                    color: selectedLanguage.english
                      ? Colors.white
                      : Colors.black,
                  }}
                >
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "35%",
                  height: "20%",
                  marginTop: "2%",
                  borderColor: Colors.black,
                  backgroundColor: selectedLanguage.french
                    ? Colors.black
                    : Colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: normalize(1),
                  borderRadius: normalize(6),
                }}
                onPress={() => {
                  changeLanguage("frCA");
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: "500",
                    color: selectedLanguage.french
                      ? Colors.white
                      : Colors.black,
                  }}
                >
                  French
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "40%",
                  height: "18%",
                  top: "20%",
                  borderColor: Colors.black,
                  backgroundColor: Colors.black,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: normalize(1),
                  borderRadius: normalize(6),
                }}
                onPress={continueAction}
              >
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: "500",
                    color: Colors.white,
                  }}
                >
                  CONTINUE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
