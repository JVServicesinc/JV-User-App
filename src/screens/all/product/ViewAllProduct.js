import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Colors } from "../../../themes/Colors";
import normalize from "../../../utils/helpers/normalize";
import Header from "../../../components/Header";
import { Fonts } from "../../../themes/Fonts";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import showErrorAlert, { ShowToast } from "../../../utils/helpers/Toast";
import isInternetConnected from "../../../utils/helpers/NetInfo";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { addToCartProductRequest, getProductByCategoryRequest, removeCartProductItemsRequest } from "../../../redux/reducer/ProductReducer";
import LottieView from "lottie-react-native";
import { checkServiceExits, getCurrentLocation, getExitsServiceDetails } from "../../../utils/helpers/halper";
import { Icons } from "../../../themes/Icons";
import Loader from "../../../utils/helpers/Loader";
import { setCartData, setCartId, setIsFetching } from "../../../redux/reducer/GlobalSlice";
import { createCart, getCartData, removeCartItem, updateCart } from "../../../services/Endpoints";

const ViewAllProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ProductReducer = useSelector((state) => state.ProductReducer);
  const { title, id } = route?.params;
  const { cartData } = useSelector((state) => state.GlobalReducer);

  useEffect(() => {
    if (isFocused && id !== "") {
      isInternetConnected()
        .then(() => {
          dispatch(getProductByCategoryRequest(id));
        })
        .catch((err) => {
          showErrorAlert("Please Connect To Internet");
        });
    }
  }, [isFocused, id]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const fetchCartData = async (cartId) => {
    if (cartId) {
      try {
        const res = await getCartData(cartId);
        if (res.status === 200) {
          const cartData = res?.data?.data;
          if (cartData) {
            dispatch(setCartData(cartData));
            dispatch(setCartId(cartId));
          }
        }
      } catch (error) {
        console.log("Cart Fetch Error--->", error);
      }
    }
  };

  const createOrUpdateCart = async (status, productItemData) => {
    dispatch(setIsFetching(true));
    if (cartData?.cart_id) {
      if (status) {
        const filteredItem = cartData?.items?.filter((item) => item?.product_id === productItemData?.id)[0];
        const itemId = filteredItem?.cart_item_id;
        try {
          const res = await removeCartItem(cartData?.cart_id, itemId);
          if (res?.data) {
            console.log(res?.data);
            ShowToast("Product succesfully removed!");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const updateCartData = new FormData();
        updateCartData.append("item_type", "product");
        updateCartData.append("product_sku", productItemData?.sku);
        updateCartData.append("product_qty", 1);
        updateCartData.append("product_price", productItemData?.price);
        try {
          const res = await updateCart(updateCartData, cartData?.cart_id);
          if (res?.data) {
            ShowToast("Product succesfully added!");
          }
        } catch (error) {
          console.log(error?.response?.data);
        }
      }
      await fetchCartData(cartData?.cart_id);
    } else {
      const res = await getCurrentLocation();
      if (res?.longitude !== 0 && res?.latitude !== 0) {
        let fromdata = new FormData();
        fromdata.append("customer_lng", "" + parseFloat(res?.longitude).toFixed(4));
        fromdata.append("customer_lat", "" + parseFloat(res?.latitude).toFixed(4));
        fromdata.append("item_type", "product");
        fromdata.append("product_sku", productItemData?.sku);
        fromdata.append("product_qty", 1);
        fromdata.append("product_price", productItemData?.price);

        try {
          const response = await createCart(fromdata);
          if (response?.data) {
            await fetchCartData(response?.data?.data?.cart_id);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    dispatch(setIsFetching(false));
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const status = cartData?.items?.some((itm) => itm?.product_id === item?.id);
      return (
        <Animatable.View animation={"fadeInUp"} duration={800} delay={index * 300}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetails", {
                itemDetails: item,
              });
            }}
            style={styles.v}
          >
            <Image source={{ uri: item?.image_url }} style={styles.img} />
            <View
              style={{
                paddingHorizontal: normalize(5),
                paddingBottom: normalize(5),
              }}
            >
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>

              <Text numberOfLines={1} style={styles.des}>
                {item.desp}
              </Text>

              <Text style={styles.card_text1}>
                ${item?.sale_price ? item?.sale_price : " -"}
                {"   "}
                {<Text style={styles.price}>${item?.price}</Text>}
              </Text>
            </View>

            <TouchableOpacity onPress={() => createOrUpdateCart(status, item)} style={styles.addcontainer}>
              <Image source={status ? Icons.tick : Icons.add} style={styles.addImg} />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animatable.View>
      );
    },
    [cartData]
  );

  function LoadingSkeleton() {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        {[1, 2, 3].map((item, index) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              width={"90%"}
              alignSelf="center"
              flexDirection="row"
              alignItems="center"
              marginTop={normalize(8)}
              justifyContent="space-between"
            >
              <SkeletonPlaceholder.Item width={normalize(138)} height={normalize(138)} borderRadius={8} />
              <SkeletonPlaceholder.Item width={normalize(138)} height={normalize(138)} borderRadius={8} />
            </SkeletonPlaceholder.Item>
          );
        })}
      </SkeletonPlaceholder>
    );
  }

  async function addToCart(service) {
    getCurrentLocation((res) => {
      if (res?.longitude !== 0 && res?.latitude !== 0) {
        // console.log('res -- ', res, service);

        let fromdata = new FormData();
        fromdata.append("customer_lng", "" + parseFloat(res?.longitude).toFixed(4));
        fromdata.append("customer_lat", "" + parseFloat(res?.latitude).toFixed(4));
        fromdata.append("item_type", "product");
        fromdata.append("product_sku", service?.sku);
        fromdata.append("product_qty", 1);
        fromdata.append("product_price", service?.sale_price);

        isInternetConnected()
          .then(() => {
            dispatch(addToCartProductRequest(fromdata));
          })
          .catch((err) => {
            showErrorAlert("Please Connect To Internet");
          });
      }
    });
  }

  async function removeToCart(cartId, service) {
    await isInternetConnected()
      .then(() => {
        dispatch(
          removeCartProductItemsRequest({
            cart_id: cartId,
            product_id: service?.id,
          })
        );
      })
      .catch((err) => {
        showErrorAlert("Please Connect To Internet");
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />

      <Loader
        visible={
          ProductReducer.status == "Product/addToCartProductRequest" ||
          ProductReducer.status == "Product/getCartProductItemsRequest" ||
          ProductReducer.status == "Product/removeCartProductItemsRequest"
        }
      />

      <View
        style={{
          width: "100%",
          paddingHorizontal: normalize(15),
        }}
      >
        <Header title={title} type={"product"} isShowOrders={true} />
      </View>
      {ProductReducer.status == "Product/getProductByCategoryRequest" ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          data={ProductReducer?.productByCategoryRes}
          keyExtractor={keyExtractor}
          numColumns={2}
          renderItem={renderItem}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: normalize(50),
          }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginHorizontal: normalize(15),
            marginVertical: normalize(7),
          }}
          ListEmptyComponent={
            <View
              style={{
                marginTop: normalize(60),
              }}
            >
              <LottieView
                source={require("../../../assets/json/empty_product.json")}
                autoPlay
                loop
                style={{
                  height: normalize(350),
                  width: normalize(350),
                  alignSelf: "center",
                }}
              />
              {/* <Text
              style={{
                color: '#068a8a',
                fontFamily: Fonts.Poppins_Medium,
                fontSize: normalize(14),
                alignSelf: 'center',
              }}>
              Product is Not Availble
            </Text> */}
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ViewAllProduct;

const styles = StyleSheet.create({
  card_text1: {
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(12),
    color: Colors.davy_grey,
    marginTop: normalize(8),
  },
  v: {
    // height: normalize(210),
    width: normalize(137),
    borderColor: Colors.border,
    borderWidth: normalize(1),
    borderRadius: normalize(15),
    padding: normalize(5),
  },
  img: {
    width: "100%",
    height: normalize(115),
    resizeMode: "cover",
    borderRadius: normalize(10),
  },
  name: {
    fontSize: normalize(14),
    color: "#161616",
    fontFamily: Fonts.Poppins_Regular,
    marginTop: normalize(5),
  },
  des: {
    color: "#757575",
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(12),
  },
  price: {
    color: "#CECECE",
    textDecorationLine: "line-through",
  },
  addcontainer: {
    height: normalize(28),
    width: normalize(28),
    backgroundColor: Colors.black,
    borderRadius: normalize(35),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: normalize(8),
    right: normalize(4),
  },
  addImg: {
    height: normalize(12),
    width: normalize(12),
    tintColor: Colors.white,
    resizeMode: "contain",
  },
});
