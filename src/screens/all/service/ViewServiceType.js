import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
import Header from '../../../components/Header';
import {Fonts} from '../../../themes/Fonts';
import * as Animatable from 'react-native-animatable';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert, {ShowToast} from '../../../utils/helpers/Toast';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import {
  addCartService,
  addToCartServiceRequest,
  getAllServicesRequest,
  removeCartItemsRequest,
} from '../../../redux/reducer/ServiceReducer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Images} from '../../../themes/Images';
import LottieView from 'lottie-react-native';
import {Icons} from '../../../themes/Icons';
import _ from 'lodash';
import {
  checkServiceExits,
  getCurrentLocation,
  getExitsServiceDetails,
  removeObjectWithId,
} from '../../../utils/helpers/halper';
import Loader from '../../../utils/helpers/Loader';
import {
  createCart,
  getCartData,
  getServiceDetails,
  removeCartItem,
  updateCart,
} from '../../../services/Endpoints';
import {setCartData, setCartId, setIsFetching} from '../../../redux/reducer/GlobalSlice';

const ViewServiceType = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ServiceReducer = useSelector(state => state.ServiceReducer);
  const {cateId, title, id} = route?.params;

  const {cartData} = useSelector(state => state.GlobalReducer);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const fetchCartData = async cartId => {
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
        console.log('Cart Fetch Error--->', error);
      }
    }
  };

  const createOrUpdateCart = async (status, serviceItemData) => {
    dispatch(setIsFetching(true));
    if (cartData?.cart_id) {
      if (status) {
        const filteredItem = cartData?.items?.filter(
          item => item?.service_id === serviceItemData?.id,
        )[0];
        const itemId = filteredItem?.id;
        try {
          const res = await removeCartItem(cartData?.cart_id, itemId);
          if (res?.data) {
            console.log(res?.data);
            ShowToast('Service succesfully removed!');
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const updateCartData = new FormData();
        updateCartData.append('item_type', 'service');
        updateCartData.append('service_id', serviceItemData?.id);
        updateCartData.append('qty', 1);
        updateCartData.append('unit_price', serviceItemData?.price);
        try {
          const res = await updateCart(updateCartData, cartData?.cart_id);
          if (res?.data) {
            ShowToast('Service succesfully added!');
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
        fromdata.append(
          'customer_lng',
          '' + parseFloat(res?.longitude).toFixed(4),
        );
        fromdata.append(
          'customer_lat',
          '' + parseFloat(res?.latitude).toFixed(4),
        );
        fromdata.append('item_type', 'service');
        fromdata.append('service_id', serviceItemData?.id);
        fromdata.append('qty', 1);
        fromdata.append('unit_price', serviceItemData?.price);

        try {
          const response = await createCart(fromdata);
          if (response?.data) {
            console.log(response?.data);
            await fetchCartData(response?.data?.data?.cart_id);
            ShowToast('Cart created!');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    dispatch(setIsFetching(false));
  };

  const renderItem = useCallback(
    ({item, index}) => {
      const status = cartData?.items?.some(itm => itm?.service_id === item?.id);
      return (
        <Animatable.View
          animation={'fadeInUp'}
          duration={800}
          delay={index * 300}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ServiceDetails', {
                itemDetails: item,
              })
            }
            style={styles.item_main}>
            <Image
              source={
                item?.image_urls[0]
                  ? {uri: item?.image_urls[0]}
                  : Images.no_photo
              }
              style={[
                styles.img,
                {
                  width: item?.image_urls[0] ? '100%' : '75%',
                  resizeMode: item?.image_urls[0] ? 'cover' : 'contain',
                },
              ]}
            />

            <Text numberOfLines={2} style={styles.title}>
              {item.name}
            </Text>

            <Text numberOfLines={2} style={styles.title}>
              $ {item.price}
            </Text>

            <Text numberOfLines={2} style={styles.title2}>
              Duration: {item.service_duration}
            </Text>

            <TouchableOpacity
              // onPress={() => {
              //   if (checkServiceExits(ServiceReducer?.addCart, item?.id)) {
              //     getExitsServiceDetails(
              //       ServiceReducer?.addCart,
              //       item?.id,
              //       res => {
              //         if (!_.isEmpty(res)) {
              //           removeToCart(ServiceReducer?.cartId, res);
              //         }
              //       },
              //     );
              //   } else {
              //     addToCart(item);
              //   }
              // }}
              onPress={async () => {
                createOrUpdateCart(status, item);
              }}
              style={styles.addcontainer}>
              <Image
                source={status ? Icons.tick : Icons.add}
                style={styles.addImg}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animatable.View>
      );
    },
    [cartData],
  );

  useEffect(() => {
    if (isFocused && id !== '' && cateId !== '') {
      isInternetConnected()
        .then(() => {
          dispatch(
            getAllServicesRequest({
              cateId: cateId,
              serId: id,
            }),
          );
        })
        .catch(err => {
          showErrorAlert('Please Connect To Internet');
        });
    }
  }, [isFocused, id]);

  function LoadingSkeleton() {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        {[1, 2, 3].map((item, index) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              width={'90%'}
              alignSelf="center"
              flexDirection="row"
              alignItems="center"
              marginTop={normalize(8)}
              justifyContent="space-between">
              <SkeletonPlaceholder.Item
                width={normalize(138)}
                height={normalize(138)}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                width={normalize(138)}
                height={normalize(138)}
                borderRadius={8}
              />
            </SkeletonPlaceholder.Item>
          );
        })}
      </SkeletonPlaceholder>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Loader
        visible={
          ServiceReducer.status == 'Service/addToCartServiceRequest' ||
          ServiceReducer.status == 'Service/getCartItemsRequest' ||
          ServiceReducer.status == 'Service/removeCartItemsRequest'
        }
      />
      <View style={styles.main}>
        <Header title={title} isShowOrders={true} type={'service'} />
      </View>
      {ServiceReducer.status == 'Service/getAllServicesRequest' ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          data={ServiceReducer?.getAllServicesRes}
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
          columnWrapperStyle={styles.flatlist}
          ListEmptyComponent={
            <View
              style={{
                marginTop: normalize(130),
              }}>
              <LottieView
                source={require('../../../assets/json/empty_service.json')}
                autoPlay
                loop
                style={{
                  height: normalize(200),
                  width: normalize(200),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color: '#068a8a',
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(14),
                  alignSelf: 'center',
                }}>
                Service Not Availble
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ViewServiceType;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  main: {
    width: '100%',
    paddingHorizontal: normalize(15),
  },
  flatlist: {
    justifyContent: 'space-between',
    marginHorizontal: normalize(15),
    marginVertical: normalize(7),
  },
  title1: {
    color: Colors.davy_grey,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
    alignSelf: 'center',
  },
  item_main: {
    height: normalize(215),
    width: normalize(137),
    borderColor: Colors.border,
    borderWidth: normalize(1),
    borderRadius: normalize(15),
    padding: normalize(5),
  },
  img: {
    height: normalize(115),
    borderRadius: normalize(10),
    alignSelf: 'center',
  },
  title: {
    fontSize: normalize(14),
    color: '#161616',
    fontFamily: Fonts.Poppins_Regular,
    marginTop: normalize(5),
    marginLeft: normalize(5),
  },
  title2: {
    fontSize: normalize(12),
    color: 'grey',
    fontFamily: Fonts.Poppins_Regular,
    marginLeft: normalize(5),
  },
  addcontainer: {
    height: normalize(28),
    width: normalize(28),
    backgroundColor: Colors.black,
    borderRadius: normalize(35),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(8),
    right: normalize(5),
  },
  addImg: {
    height: normalize(12),
    width: normalize(12),
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
});
