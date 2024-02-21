import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../themes/Colors";
import normalize from "../../../../utils/helpers/normalize";
import { Images } from "../../../../themes/Images";
import { Fonts } from "../../../../themes/Fonts";
import { Icons } from "../../../../themes/Icons";
import { useIsFocused } from "@react-navigation/native";
import { setCurrentTab } from "../../../../redux/reducer/AuthReducer";
import { useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Steper from "../../../../components/Steper";

const Ongoing = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isFocused) {
      dispatch(setCurrentTab(true));
      setIsPlaying(true);
      setKey((prevKey) => prevKey + 1);
      setCurrentStep(0);
    } else {
      setIsPlaying(false);
      setKey((prevKey) => prevKey + 1);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (currentStep == 0) {
        setTimeout(() => {
          setCurrentStep(1);
        }, 2000);
      } else if (currentStep == 1) {
        setTimeout(() => {
          setCurrentStep(2);
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.navigate("ServiceCompleted");
        }, 2000);
      }
    }
  }, [isFocused, currentStep]);

  function Timer({ time }) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
      <Text style={styles.ts} accessibilityRole="timer" accessibilityLiveRegion="assertive" importantForAccessibility="yes">
        {/* {`${hours}:${minutes}:${seconds}`} seconds */}
        {`${minutes}:${seconds}`}
      </Text>
    );
  }

  const PAGES = ["Agent\narrived", "Service\nstarted", "Service\ncompleted"];

  const ARR = [
    {
      icon: Images.ac_service,
      title: "AC Service",
      subTitle: "• 1 hr\n• Includes dummy info",
    },
    {
      icon: Images.img17,
      title: "Part change",
      subTitle: "• Part info\n• Includes dummy info",
      price: "$299",
    },
    {
      icon: Images.img18,
      title: "AC cleanup",
      subTitle: "• 1 hr\n• Includes dummy info",
      price: "$499",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ImageBackground source={Images.workB} resizeMode="contain" style={styles.ic}>
        <ImageBackground source={Images.workC} resizeMode="contain" style={styles.icc}>
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={30} // 1200
            trailColor="transparent"
            colors={"#329292"}
            isGrowing={true}
            rotation={"counterclockwise"}
            trailStrokeWidth={normalize(6)}
            strokeWidth={normalize(6)}
            // onComplete={() => {
            //   // do your stuff here
            //   return { shouldRepeat: true, delay: 1.5 }
            // }}
            size={normalize(82)}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime, animatedColor }) => <Timer time={remainingTime} />}
          </CountdownCircleTimer>
        </ImageBackground>

        <Steper
          style={{
            position: "absolute",
            bottom: 0,
          }}
          data={PAGES}
          color={["#F5C443", "#2B95E9", "#329292"]}
          currentStep={currentStep}
        />
      </ImageBackground>

      <FlatList
        style={{
          backgroundColor: Colors.white,
          height: "100%",
          width: "100%",
        }}
        ListHeaderComponent={
          <View style={styles.udc}>
            <View style={{ flexDirection: "row" }}>
              <Image source={Icons.user1} style={styles.ui} />
              <View>
                <Text style={styles.ut}>Jim Carrey</Text>
                <Text style={styles.ust}>Electrician</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image style={styles.star} source={Icons.star} />
                  <Text style={styles.rt}>{" 4.8 (27)"}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#F2EBFF",
                height: "100%",
                width: normalize(55),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: normalize(8),
              }}
            >
              <Text
                style={{
                  color: "#161616",
                  fontFamily: Fonts.Poppins_SemiBold,
                  fontSize: normalize(12),
                  textAlign: "center",
                }}
              >
                {"OTP\n"}
                {
                  <Text
                    style={{
                      color: "#5E17EB",
                    }}
                  >
                    5347
                  </Text>
                }
              </Text>
            </View>
          </View>
        }
        data={ARR}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: normalize(50),
        }}
        renderItem={({ item, index }) => {
          return (
            <>
              {index == 1 && (
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_SemiBold,
                    fontSize: normalize(12),
                    color: "#161616",
                    width: "90%",
                    alignSelf: "center",
                    marginTop: normalize(15),
                  }}
                >
                  New Added Services
                </Text>
              )}
              <View style={styles.sc}>
                <Image source={item.icon} style={styles.si} />
                <View>
                  <Text style={[styles.otpt, { fontSize: normalize(12) }]}>{item.title}</Text>
                  <Text style={styles.st}>{item.subTitle}</Text>
                </View>
                {item?.price ? (
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color: "#5E17EB",
                      fontFamily: Fonts.Poppins_SemiBold,
                      position: "absolute",
                      right: normalize(10),
                      top: normalize(10),
                    }}
                  >
                    {item.price}
                  </Text>
                ) : null}
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default Ongoing;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(18),
  },
  ic: {
    width: "100%",
    height: normalize(218),
    alignItems: "center",
  },
  icc: {
    height: normalize(165),
    width: normalize(165),
    position: "absolute",
    top: -normalize(12),
    justifyContent: "center",
    alignItems: "center",
  },
  ts: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(16),
    color: Colors.white,
  },
  udc: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    paddingVertical: normalize(12),
    justifyContent: "space-between",
    height: normalize(75),
    backgroundColor: Colors.white,
  },
  ui: {
    height: normalize(45),
    width: normalize(55),
    resizeMode: "cover",
    borderRadius: normalize(8),
    marginRight: normalize(10),
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
});
