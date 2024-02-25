import { StyleSheet, Text, View, Dimensions, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import { Icons } from "../../themes/Icons";
import normalize from "../../utils/helpers/normalize";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/LocalStore";
import constants from "../../utils/helpers/constants";
import { setStart, setUserToken } from "../../redux/reducer/AuthReducer";
//Translate
import "../../utils/helpers/i18n.config";
import * as RNLocalize from "react-native-localize";
import { useTranslation } from "react-i18next";
import { getCartId } from "../../redux/reducer/ServiceReducer";
import { getCartProductId } from "../../redux/reducer/ProductReducer";
import { setLanguage } from "../../redux/reducer/LanguageReducer";

const Splash = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  function languageChanges() {
    try {
      const _dfLan = [
        {
          countryCode: "English",
          languageTag: "en-US",
          languageCode: "en",
          isRTL: false,
        },
        {
          countryCode: "Français canadien",
          languageTag: "fr-CA",
          languageCode: "fr",
          isRTL: false,
        },
      ];

      let defaultLnaguage = new String(
        getData(constants.LANGUAGE, (value) => {
          RNLocalize.getLocales()[value === "frCA" ? 1 : 0]?.languageTag;
        })
      ).toString();

      const _findex = _dfLan?.findIndex((item) => item.languageTag == defaultLnaguage);

      defaultLnaguage = defaultLnaguage?.replace(/-/g, "");

      if (_findex != -1) {
        i18n.changeLanguage(defaultLnaguage);
      } else {
        if (defaultLnaguage?.length > 1) {
          defaultLnaguage = new String(defaultLnaguage ?? "").substring(0, 2);

          const _findex2 = _dfLan?.filter((item) => item.languageCode == defaultLnaguage);

          if (_findex2?.length > 0) {
            defaultLnaguage = new String(_findex2[0]?.languageTag).toString();
            defaultLnaguage = defaultLnaguage.replace(/-/g, "");
            i18n.changeLanguage(defaultLnaguage);
          } else {
            i18n.changeLanguage(defaultLnaguage);
          }
        } else {
          i18n.changeLanguage(defaultLnaguage);
        }
      }
    } catch (ex) {
      let defaultLnaguage = new String(RNLocalize.getLocales()[0]?.languageTag ?? "").toString();
      i18n.changeLanguage(defaultLnaguage);
    }
  }

  function getInfo() {
    getData(constants.STARTING, (res) => {
      if (res !== "") {
        // dispatch(setStart('1'));
        getData(constants.TOKEN, (res1) => {
          if (res1 !== "") {
            getData(constants.USER_ID, (res2) => {
              dispatch(setLanguage(true));
              dispatch(
                setUserToken({
                  token: res1,
                  user_id: res2,
                })
              );
            });

            getData(constants.CART_ID, (res2) => {
              dispatch(getCartId(res2));
            });

            getData(constants.PRODUCT_CART_ID, (res2) => {
              dispatch(getCartProductId(res2));
            });
          } else {
            getData(constants.LANGUAGE, (value) => {
              dispatch(setStart("1"));
              dispatch(setLanguage(value === "" || value === null || value === undefined ? null : value));
            });
          }
        });
      } else {
        dispatch(setStart(null));
      }
    });
  }

  useEffect(() => {
    // languageChanges();
    getData(constants.LANGUAGE, (value) => {
      value !== "" && i18n.changeLanguage(value);
    });
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      getInfo();
    }, 1500);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.lefttHalf}>
          <Image source={Icons.JEsplash} style={{ ...styles.image, alignSelf: "flex-end" }} />
        </View>
        <View style={styles.rightHalf}>
          <Image source={Icons.VEUXsplash} style={{ ...styles.image }} />
        </View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    height: normalize(220),
    width: normalize(120),
    resizeMode: "contain",
  },

  lefttHalf: {
    backgroundColor: "#F7F7F7",
    height: Dimensions.get("window").height,
    width: "50%",
    justifyContent: "center",
  },
  rightHalf: {
    backgroundColor: "#000",
    height: Dimensions.get("window").height,
    width: "50%",
    justifyContent: "center",
  },
});
