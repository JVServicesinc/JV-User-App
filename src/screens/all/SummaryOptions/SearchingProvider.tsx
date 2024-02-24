import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Header from "../../../components/Header";
import LottieView from "lottie-react-native";
import { Icons } from "../../../themes/Icons";
import normalize from "../../../utils/helpers/normalize";
import { useSelector } from "react-redux";
import { createOrder } from "../../../services/Endpoints";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  safearea: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  headerContainer: {
    width: "90%",
    height: "6%",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieStyle: { height: "100%", width: "100%" },
  spinLottieStyle: {
    height: "40%",
    width: "100%",
    top: "32.5%",
    position: "absolute",
  },
  chickContainer: {
    height: "23%",
    width: "100%",
    borderRadius: Dimensions.get("screen").width * 0.5,
    top: "40%",
    position: "absolute",
    overflow: "hidden",
  },
  chickLottie: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  confirmationContainer: {
    height: "22%",
    width: "100%",
    borderRadius: Dimensions.get("screen").width * 0.5,
    top: "41.5%",
    position: "absolute",
    overflow: "hidden",
  },
  confirmationLottie: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

type RootStackParamList = {
  ServiceSummary: { details: { address: any; houseNum: any; landmark: any; isSubmitLocation: any } };
  PaymentOption: { orderId: string };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ServiceSummary">;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "ServiceSummary">;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

export const SearchingProvider: React.FC<Props> = ({ navigation, route }) => {
  const { cartData } = useSelector((state: any) => state.GlobalReducer);
  const orderDetails = route?.params?.details;

  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    const generateOrder = async () => {
      let formdata = new FormData();

      let payload: any = {
        cart_id: cartData?.cart_id,
        customer_address_id: orderDetails?.address?.id,
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      };

      // console.log("Payload---->", payload);

      for (const key in payload) {
        formdata.append(key, payload[key]);
      }
      const orderRes = await createOrder(formdata);
      if (orderRes.status == 200) {
        // console.log("Order Details --- ", orderRes);
        setTimeout(() => {
          setIsSearching(false);
          setTimeout(() => {
            navigation.navigate("PaymentOption", { orderId: orderRes?.data?.data?.order_id });
          }, 5000);
        }, 5000);
      }
    };

    generateOrder();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.headerContainer}>
          <Header
            title={""} //t("Finding Matches")
            hideOrders={true}
            onPress={() => {
              //
            }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <LottieView source={Icons.searching_provider} style={styles.lottieStyle} autoPlay={true} />
          <LottieView source={Icons.spinning} style={styles.spinLottieStyle} autoPlay={true} />
          {isSearching ? (
            <View style={styles.chickContainer}>
              <LottieView source={Icons.chick} style={styles.chickLottie} autoPlay={true} />
            </View>
          ) : (
            <View style={styles.confirmationContainer}>
              <LottieView source={Icons.provider_confirmation} style={styles.confirmationLottie} autoPlay={true} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};
